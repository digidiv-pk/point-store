import React, { ChangeEvent, Component, createRef, FormEvent } from 'react';
import { Modal } from 'react-bootstrap';
import { RouteComponentProps, withRouter } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context';
import { StoreRegisterStep2DTO } from '../../shared/dto';
import { API, Validator } from '../../utility';
import { CityInterface } from '../../utility/api/City';
import { StoreCategoryInterface } from '../../utility/api/StoreCategory';
import { Loading } from '../index';
import './StoreDetailsModal.scss';

interface Props extends RouteComponentProps<any> {
  show: boolean;

  onHide(): void;
}

interface Errors {
  [key: string]: any;
}

interface State {
  values: StoreRegisterStep2DTO;
  cities: CityInterface[];
  categories: StoreCategoryInterface[];
  errors: Errors;
  loading: boolean;
}

export class StoreDetailsModal extends Component<Props, State> {
  static contextType = AuthContext.Context;
  map: google.maps.Map;
  marker: google.maps.Marker;
  boundary: google.maps.LatLngLiteral[] = [];
  polygon: google.maps.Polygon;

  state: State = {
    values: {
      title: '',
      friendlyTitle: '',
      description: '',
      phoneNumber: '',
      address: {},
      image: '',
      email: '',
      city: '',
      category: '',
    },
    loading: false,
    cities: [],
    categories: [],
    errors: {},
  };

  private googleSearchInput = createRef<HTMLInputElement>();
  private googleSearchCard = createRef<HTMLDivElement>();
  private googleMap = createRef<HTMLDivElement>();

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (this.props.show && prevProps.show !== this.props.show) {
      this.addScriptIfNotExist();
      this.getCitiesAndStoreCategoriesList();
    }

    if (this.state.values.city !== prevState.values.city) {
      const city = this.state.cities.find((item) => item.title === this.state.values.city);
      if (city) {
        this.drawBoundaryOnMap(city.boundary.coordinates[0]);
      }
    }
  }

  getCitiesAndStoreCategoriesList(): void {
    Promise.all([API.City.list(), API.StoreCategory.list()])
      .then(([cities, categories]) => {
        this.setState({
          categories: categories.data,
          cities: cities.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  addScriptIfNotExist(): void {
    if (document.getElementById('google-map-script')) {
      this.initMap();
    } else {
      const script: HTMLScriptElement = document.createElement('script');

      const url: URL = new URL('https://maps.googleapis.com/maps/api/js');
      url.searchParams.set('key', 'AIzaSyCW1StKCGR6HPpaROJpUEAviFtexNPzW70');
      url.searchParams.set('libraries', 'places');
      url.searchParams.set('v', '3.26');
      script.id = 'google-map-script';
      script.src = url.href;
      script.onload = () => {
        this.initMap();
      };
      document.body.appendChild(script);
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
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
      this.googleSearchCard.current as HTMLDivElement,
    );
    this.map.addListener('click', (event) => {
      if (this.polygon) {
        if (!google.maps.geometry.poly.containsLocation(event.latLng, this.polygon)) {
          alert('You cant select Location Outside the Selected Area');
        }
      } else {
        alert('Select City before Drag on Map');
      }
    });
    this.map.addListener('idle', (event) => {
      setTimeout(() => {
        (this.googleSearchCard.current as HTMLDivElement).removeAttribute('hidden');
      }, 800);
    });
    this.autoComplete();
  }

  drawBoundaryOnMap = (coordinates: number[][]) => {
    const bounds = new google.maps.LatLngBounds();
    if (this.polygon) {
      this.polygon.setMap(null);
    }
    if (this.marker) {
      this.marker.setMap(null);
    }
    this.boundary = coordinates.map((item) => {
      const point = new google.maps.LatLng(item[1], item[0]);
      bounds.extend(point);
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
    this.map.fitBounds(bounds);
    this.polygon.setMap(this.map);
    this.mapMarkerUpdate(bounds.getCenter());
    this.polygon.addListener('click', (event) => {
      this.mapMarkerUpdate(event.latLng);
    });
  };

  mapMarkerUpdate(position: google.maps.LatLng): void {
    if (this.marker) {
      this.marker.setPosition(position);
      if (!this.marker.getMap()) {
        this.marker.setMap(this.map);
      }
    } else {
      this.marker = new google.maps.Marker({
        position,
        map: this.map,
        anchorPoint: new google.maps.Point(0, -29),
      });
    }
    this.setState({
      values: {
        ...this.state.values,
        address: {
          ...this.state.values.address,
          location: {
            type: 'Point',
            coordinates: [position.lng(), position.lat()],
          },
        },
      },
    });
  }

  autoComplete(): void {
    const autocomplete = new google.maps.places.Autocomplete(
      this.googleSearchInput.current as HTMLInputElement,
    );
    autocomplete.bindTo('bounds', this.map);
    autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);
    autocomplete.addListener('place_changed', () => {
      const place: google.maps.places.PlaceResult = autocomplete.getPlace();
      if (place.geometry?.viewport) {
        this.map.fitBounds(place.geometry?.viewport);
      } else {
        this.map.setCenter(place.geometry?.location as google.maps.LatLng);
        this.map.setZoom(18);
      }
      if (this.polygon) {
        if (
          !google.maps.geometry.poly.containsLocation(
            place.geometry?.location as google.maps.LatLng,
            this.polygon,
          )
        ) {
          alert('Search Location is Outside Selected Area');
        } else {
          this.mapMarkerUpdate(place.geometry?.location as google.maps.LatLng);
        }
      } else {
        alert('Select city before search location on map');
      }
    });
  }

  onChange = (event: ChangeEvent<any>) => {
    const input = event.target;
    const values = {
      ...this.state.values,
    };
    if (input.name === 'address') {
      values.address = {
        ...values.address,
        locality: input.value,
      };
    } else if (input.name === 'title') {
      values[input.name] = input.value;
      values.friendlyTitle = input.value;
    } else {
      values[input.name] = input.value;
    }
    this.setState({
      values,
    });
  };

  onUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const files: FileList = event.target.files as FileList;
    const formData = new FormData();
    formData.append('file', files[0]);
    API.Media.upload(formData)
      .then((response) => {
        event.target.value = '';
        this.setState((state) => {
          return {
            values: {
              ...state.values,
              image: response.data.path,
            },
          };
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onSubmit = (event: FormEvent) => {
    event.preventDefault();
    Validator.validate(StoreRegisterStep2DTO, { ...this.state.values })
      .then((validate) => {
        this.addStoreDetails();
      })
      .catch((errors) => {
        this.setState({
          errors,
        });
        console.log(errors);
      });
  };

  addStoreDetails(): void {
    this.setState({ loading: true });
    API.Store.registerStep2(this.state.values)
      .then((response) => {
        if (response.data.store) {
          API.Store.byId({ id: response.data.store as string })
            .then((storeResponse) => {
              this.context.action.updateUser(response.data);
              this.context.action.updateStore(storeResponse.data);
              this.context.action.setOnline(storeResponse.data.online);
              this.context.action.logoutUser();
              this.props.history.push('/dashboard');
              this.setState({ loading: false });
              toast.success('Store Registered Successfully');
              console.log(storeResponse);
            })
            .catch((error) => {
              this.setState({ loading: false });
              console.error(error.response);
              toast.error(error.response.data.message);
            });
        } else {
          this.context.action.updateUser(response.data);
        }
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error.response);
        if (error.response.status === 500) {
          toast.error('There is an error during create store');
        }
        if (error.response.status === 422) {
          toast.error(error.response.data.message.join('\n'));
        } else {
          toast.error(error.response.data.message);
        }
      });
  }

  displayErrors(errors: string[] | string | undefined): JSX.Element {
    if (errors instanceof String) {
      return <small className="form-text text-danger">{errors}</small>;
    } else if (errors instanceof Array) {
      return (
        <small className="form-text text-danger">
          <ul style={{ listStyle: 'none' }}>
            {(errors as string[]).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </small>
      );
    } else {
      return <></>;
    }
  }

  render(): JSX.Element {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} size="lg" centered={true}>
        {this.state.loading && <Loading />}
        <Modal.Header closeButton={true} className="half-round">
          <Modal.Title className="m-title" id="contained-modal-title-vcenter">
            Store Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="store-detail" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    placeholder="Title"
                    className="input-style form-control"
                    id="title"
                    name="title"
                    required={true}
                    onChange={this.onChange}
                  />
                  {!!this.state.errors['title'] && this.displayErrors(this.state.errors['title'])}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="input-style form-control"
                    id="email"
                    required={true}
                    name="email"
                    onChange={this.onChange}
                  />
                  {!!this.state.errors['email'] && this.displayErrors(this.state.errors['email'])}
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="input-style form-control"
                    id="phoneNumber"
                    required={true}
                    name="phoneNumber"
                    onChange={this.onChange}
                  />
                  {!!this.state.errors['phoneNumber'] &&
                    this.displayErrors(this.state.errors['phoneNumber'])}
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">Image</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.values.image}
                      readOnly={true}
                    />
                    <div className="input-group-append">
                      <label className="input-group-text btn">
                        <span>Upload Image</span>
                        <input
                          type="file"
                          accept=".gif, .jpg, .png,"
                          onChange={this.onUploadImage}
                          hidden={true}
                        />
                      </label>
                    </div>
                  </div>
                  {!!this.state.errors['image'] && this.displayErrors(this.state.errors['image'])}
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    className="input-style form-control"
                    id="category"
                    name="category"
                    placeholder="Select Category"
                    required={true}
                    onChange={this.onChange}>
                    <option value="" disabled={true} selected={true}>
                      Select Category
                    </option>
                    {!!this.state.categories &&
                      (this.state.categories as StoreCategoryInterface[]).map((item) => (
                        <option value={item.id} key={item.title}>
                          {item.title}
                        </option>
                      ))}
                  </select>

                  {!!this.state.errors['category'] &&
                    this.displayErrors(this.state.errors['category'])}
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control input-style"
                    placeholder="Description"
                    name="description"
                    required={true}
                    onChange={this.onChange}
                  />
                  {!!this.state.errors['description'] &&
                    this.displayErrors(this.state.errors['description'])}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    className="input-style form-control"
                    id="address"
                    name="address"
                    required={true}
                    onChange={this.onChange}
                  />
                  {!!this.state.errors['address'] && (
                    <>
                      {!!this.state.errors['address']['locality'] &&
                        this.displayErrors(this.state.errors['address']['locality'])}
                    </>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="cities">City</label>
                  <select
                    className="input-style form-control"
                    id="cities"
                    name="city"
                    placeholder="Select City"
                    required={true}
                    onChange={this.onChange}>
                    <option value="" disabled={true} selected={true}>
                      Select City
                    </option>
                    {!!this.state.cities &&
                      (this.state.cities as CityInterface[]).map((item) => (
                        <option value={item.title} key={item.title}>
                          {item.title}
                        </option>
                      ))}
                  </select>

                  {!!this.state.errors['city'] && this.displayErrors(this.state.errors['city'])}
                </div>
                <div
                  style={{
                    width: '100%',
                    padding: '10px',
                  }}
                  hidden={true}
                  ref={this.googleSearchCard}>
                  <input
                    type="text"
                    placeholder="Location"
                    style={{
                      width: '100%',
                      height: '40px',
                      padding: '5px',
                      fontSize: '15px',
                      outline: 'unset',
                      border: '1px solid gray',
                    }}
                    ref={this.googleSearchInput}
                  />
                </div>

                <div
                  ref={this.googleMap}
                  style={{
                    width: '100%',
                    height: '300px',
                  }}
                />
                {!!this.state.errors['address'] && (
                  <>
                    {!!this.state.errors['address']['location'] &&
                      this.displayErrors(this.state.errors['address']['location'])}
                  </>
                )}
              </div>
            </div>
            <button type="submit" className="btn store-detail float-right mt-3">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(StoreDetailsModal);
