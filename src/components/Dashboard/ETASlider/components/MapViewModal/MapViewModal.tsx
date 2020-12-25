import React, { createRef, PureComponent } from 'react';
import { Modal } from 'react-bootstrap';
import { AuthContext } from '../../../../../context';

interface Location {
  loc: {
    coordinates: [number, number];
  };
  id: string;
}
interface Props {
  id: string;
  socket: SocketIOClient.Socket;
  onHide(): void;
}

class MapViewModal extends PureComponent<Props, any> {
  static contextType = AuthContext.Context;
  map: google.maps.Map;
  marker: google.maps.Marker;
  storeMarker: google.maps.Marker;
  location: Location;
  interval: any;
  private googleMap = createRef<HTMLDivElement>();
  componentDidMount(): void {
    this.initMap();
    // this.interval = setInterval(() => {
    //   this.props.socket.emit('get-location', this.props.id);
    // }, 3000);
    this.props.socket.on('location-fetched', (data: Location) => {
      console.log(data);
      if (data.id === this.props.id) {
        this.location = data;
        const position = new google.maps.LatLng(data.loc.coordinates[0], data.loc.coordinates[1]);
        const bounds = new google.maps.LatLngBounds();
        if (this.storeMarker) {
          bounds.extend(this.storeMarker.getPosition() as google.maps.LatLng);
        }
        if (!this.marker) {
          this.marker = new google.maps.Marker({
            position,
            map: this.map,
            anchorPoint: new google.maps.Point(0, -29),
          });
          bounds.extend(this.marker.getPosition() as google.maps.LatLng);
        } else {
          this.marker.setPosition(position);
          bounds.extend(this.marker.getPosition() as google.maps.LatLng);
        }
        this.map.fitBounds(bounds);
      }
    });
  }

  componentWillUnmount(): void {
    if (!!this.interval) {
      clearInterval(this.interval);
    }
  }

  initMap(): void {
    const center: google.maps.LatLng = new google.maps.LatLng(-34.397, 150.644);
    this.map = new google.maps.Map(this.googleMap.current as HTMLDivElement, {
      center,
      zoom: 8,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
    });
    const position = new google.maps.LatLng(
      this.context.state.store.address.location.coordinates[1] as number,
      this.context.state.store.address.location.coordinates[0] as number,
    );
    this.storeMarker = new google.maps.Marker({
      position,
      map: this.map,
      anchorPoint: new google.maps.Point(0, -29),
      title: this.context.state.store.title,
    });
    this.map.setCenter(position);
  }

  render(): JSX.Element {
    return (
      <Modal
        {...this.props}
        show={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}>
        <div className="modal-body">
          <div
            ref={this.googleMap}
            style={{
              width: '100%',
              height: '500px',
            }}
          />
        </div>
      </Modal>
    );
  }
}

export default MapViewModal;
