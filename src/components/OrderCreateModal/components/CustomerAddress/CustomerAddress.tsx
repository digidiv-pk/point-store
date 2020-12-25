import React, { Component, createRef } from 'react';
import { AuthContext } from '../../../../context';
import { AddressInterface } from '../../../../shared/interface';
import { API } from '../../../../utility';
import { CityInterface } from '../../../../utility/api/City';

interface Props {
  next(deliveryAddress: AddressInterface): void;
}

interface State {
  deliveryAddress: AddressInterface;
  city?: CityInterface;
  boundary: number[][];
}

const initialState: State = {
  deliveryAddress: {
    locality: '',
    location: {
      type: 'Point',
      coordinates: [0, 0],
    },
  },
  boundary: [],
};

const getInitialState = (): State => {
  return JSON.parse(JSON.stringify(initialState));
};

class CustomerAddress extends Component<Props, State> {
  static contextType = AuthContext.Context;
  state = getInitialState();
  private boundary: google.maps.LatLngLiteral[] = [];
  private bounds: google.maps.LatLngBounds;
  private polygon: google.maps.Polygon;
  private googleSearchInput = createRef<HTMLInputElement>();

  componentDidMount(): void {
    this.getCityByLocation();
  }

  addScriptIfNotExist(): void {
    if (!document.getElementById('google-map-script')) {
      const script: HTMLScriptElement = document.createElement('script');

      const url: URL = new URL('https://maps.googleapis.com/maps/api/js');
      url.searchParams.set('key', 'AIzaSyCW1StKCGR6HPpaROJpUEAviFtexNPzW70');
      url.searchParams.set('libraries', 'places');
      url.searchParams.set('v', '3.26');
      script.id = 'google-map-script';
      script.src = url.href;
      script.onload = () => {
        this.getCityBoundary();
        this.autoComplete();
      };
      document.body.appendChild(script);
    } else {
      this.getCityBoundary();
      this.autoComplete();
    }
  }

  autoComplete(): void {
    const autocomplete = new google.maps.places.Autocomplete(
      this.googleSearchInput.current as HTMLInputElement,
    );
    autocomplete.setBounds(this.bounds);
    autocomplete.setOptions({
      strictBounds: true,
    });
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    autocomplete.addListener('place_changed', () => {
      const place: google.maps.places.PlaceResult = autocomplete.getPlace();
      if (
        google.maps.geometry.poly.containsLocation(
          place.geometry?.location as google.maps.LatLng,
          this.polygon,
        )
      ) {
        this.setState({
          deliveryAddress: {
            ...this.state.deliveryAddress,
            locality: (this.googleSearchInput.current as HTMLInputElement).value,
            location: {
              ...this.state.deliveryAddress.location,
              coordinates: [
                place.geometry?.location.lng() as number,
                place.geometry?.location.lat() as number,
              ],
            },
          },
        });
      } else {
        alert('Search Location is Outside Store Area');
      }
    });
  }

  getCityByLocation(): void {
    API.City.byLoc(this.context.state.store.address.location)
      .then((response) => {
        console.log(response.data.boundary);
        this.setState(
          {
            city: response.data,
            boundary: response.data.boundary.coordinates[0],
          },
          () => {
            this.addScriptIfNotExist();
          },
        );
        console.log(response);
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  getCityBoundary = () => {
    this.bounds = new google.maps.LatLngBounds();
    this.boundary = this.state.boundary.map((item) => {
      const point = new google.maps.LatLng(item[1], item[0]);
      this.bounds.extend(point);
      return {
        lat: item[1],
        lng: item[0],
      };
    });

    this.polygon = new google.maps.Polygon({
      paths: this.boundary,
      strokeColor: '#41ff2c',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#41ff2c',
      fillOpacity: 0.35,
    });
  };

  render(): JSX.Element {
    return (
      <>
        <div className="dialog-title">Delivery Address</div>
        <div className="dialog-desc">Please enter the delivery address below</div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <span className="material-icons">location_on</span>
            </span>
          </div>
          <input
            className="form-control"
            placeholder="Customer’s Address"
            type="text"
            ref={this.googleSearchInput}
          />
        </div>
        <button
          className="btn dialog-button"
          type="button"
          disabled={
            !(
              !!this.state.deliveryAddress.locality &&
              this.state.deliveryAddress.location.coordinates[0] &&
              this.state.deliveryAddress.location.coordinates[1]
            )
          }
          onClick={() => this.props.next(this.state.deliveryAddress)}>
          Continue
        </button>
      </>
    );
  }
}

export default CustomerAddress;
