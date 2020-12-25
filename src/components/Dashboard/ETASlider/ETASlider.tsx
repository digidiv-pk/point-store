import moment from 'moment';
import React, { Component, MouseEvent } from 'react';
import SlickSlider, { Settings } from 'react-slick';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import socketIOClient from 'socket.io-client';
import { getGeoPointsDistance } from 'utility';
import images from '../../../assets/img';
import { AuthContext, LanguageContext } from '../../../context';
import { Realm } from '../../../shared/enum';
import { CartInterface } from '../../../shared/interface';
import { API, Cookies } from '../../../utility';
import { MapViewModal, NextButton, PrevButton } from './components';
import classes from './ETASlider.module.scss';

interface State {
  carts: CartInterface[];
  eta: Record<string, number>;
  show: string | null;
}

interface Location {
  loc: {
    coordinates: [number, number];
  };
  id: string;
}

class ETASlider extends Component<any, State> {
  static contextType = AuthContext.Context;
  state: State = {
    carts: [],
    eta: {},
    show: null,
  };
  public readonly onClickObservable: Observable<string>;
  interval: any;
  socket: SocketIOClient.Socket;
  private slider: SlickSlider;
  private readonly onClickSubject: BehaviorSubject<string>;

  constructor(props: any) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.onClickSubject = new BehaviorSubject<string>('');
    this.onClickObservable = this.onClickSubject.asObservable();
  }

  componentDidMount(): void {
    const url = new URL(API.BASE_URL);
    url.searchParams.set('token', Cookies.get('authToken'));
    url.searchParams.set('realm', Realm.PointStore);
    url.searchParams.set('store', this.context.state.store.id);
    this.socket = socketIOClient(url.href);
    this.socket.on('connect', () => {
      console.log('Socket Testing');
    });
    this.onClickObservable.pipe(debounceTime(300), distinctUntilChanged()).subscribe((data) => {
      if (!!data) {
        this.setState({ show: data });
      }
      console.log(data);
    });
    API.Store.trackableOrders()
      .then((response) => {
        const carts: CartInterface[] = response.data.carts;
        const ordersETA: Record<string, number> = {};
        for (const cart of carts) {
          if (!!cart.delivery?.boy) {
            ordersETA[cart.delivery?.boy as string] = 15;
          }
        }
        this.setState({ carts, eta: ordersETA }, () => {
          this.calculateDistance();
        });
        console.log(response);
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  componentWillUnmount(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  calculateDistance(): void {
    const storeLocation = new google.maps.LatLng(
      this.context.state.store.address.location.coordinates[1] as number,
      this.context.state.store.address.location.coordinates[0] as number,
    );
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.socket.on('location-fetched', (data: Location) => {
      const ordersETA: Record<string, number> = { ...this.state.eta };
      const boyLocation = new google.maps.LatLng(data.loc.coordinates[0], data.loc.coordinates[1]);
      ordersETA[data.id] = getGeoPointsDistance(boyLocation, storeLocation) * 3;
      this.setState({ eta: ordersETA });
    });

    this.interval = setInterval(() => {
      Object.keys(this.state.eta).forEach((id) => {
        this.socket.emit('get-location', id);
      });
    }, 3000);
  }

  onClickSlider = (event: MouseEvent<HTMLDivElement>, id: string) => {
    event.persist();
    this.onClickSubject.next(id);
  };

  next(e: MouseEvent<HTMLButtonElement>): void {
    this.slider.slickNext();
  }

  previous(e: MouseEvent<HTMLButtonElement>): void {
    this.slider.slickPrev();
  }

  onHideMapView = () => {
    this.setState({ show: null });
  };

  displayTime = (minutes: number): string => {
    if (!!minutes) {
      return moment().add(minutes, 'minutes').fromNow();
    } else {
      return '';
    }
  };

  render(): JSX.Element {
    const settings: Settings = {
      infinite: false,
      prevArrow: <PrevButton onClick={this.previous} />,
      nextArrow: <NextButton onClick={this.next} />,
      variableWidth: true,
      slidesToScroll: 1,
      swipeToSlide: true,
      slidesToShow: 1,
      initialSlide: 0,
      focusOnSelect: false,
      cssEase: 'linear',
      speed: 500,
      draggable: true,
      className: classes.slider,
    };
    return (
      <LanguageContext.Consumer>
        {({ state }) => (
          <div style={{ position: 'relative' }}>
            {this.state.show !== null && (
              <MapViewModal
                socket={this.socket}
                id={this.state.show as string}
                onHide={this.onHideMapView}
              />
            )}
            {!!this.state.carts.length && (
              <span style={{ position: 'absolute', color: '#808080', fontSize: '15px' }}>
                {state.lang === 'en' && <>ETA of the courier</>}
                {state.lang === 'he' && <>זמן הגעה של השליח</>}
              </span>
            )}
            {!this.state.carts.length && (
              <span style={{ position: 'absolute', color: '#808080', fontSize: '15px' }}>
                {state.lang === 'en' && <>No active deliveries at this time</>}
                {state.lang === 'he' && <>אין משלוחים פעילים כרגע</>}
              </span>
            )}
            {!!this.state.carts.length && (
              <SlickSlider
                ref={(s) => {
                  this.slider = s as SlickSlider;
                }}
                {...settings}>
                {this.state.carts.map((item) => (
                  <div
                    key={item.id}
                    className={classes.sliderItem}
                    onClick={(e) => this.onClickSlider(e, item.delivery?.boy as string)}>
                    <div className={classes.sliderTitle}>
                      {this.displayTime(this.state.eta[item.delivery?.boy as string]).replace(
                        'in ',
                        '',
                      )}
                    </div>
                    <div className={classes.sliderImage}>
                      <img src={images.bgMapImage} alt="" />
                      <div className={classes.profile}>
                        <img src={item.delivery?.profile || images.profileImage} alt="" />
                      </div>
                    </div>
                    <div className={classes.sliderDescription}>
                      {state.lang === 'en' && <>Order #:</>}
                      {state.lang === 'he' && <>מס הזמנה #</>} {item.id}
                    </div>
                  </div>
                ))}
              </SlickSlider>
            )}
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default ETASlider;
