import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context';
import { TransportationType } from '../../shared/enum';
import {
  AddressInterface,
  OrderCreateInterface,
  OrderRequestItem,
  ProductListingInterface,
} from '../../shared/interface';
import { API } from '../../utility';
import { Loading } from '../index';
import {
  CourierService,
  CustomerAddress,
  CustomerInfo,
  OrderSuccess,
  Products,
  ProductsQuantity,
} from './components';

declare type ComponentShow =
  | 'products'
  | 'products-quantity'
  | 'customer-info'
  | 'customer-address'
  | 'courier'
  | 'success';

interface State {
  show: ComponentShow;
  productListing: ProductListingInterface[];
  loading: boolean;
  error: string;
  values: OrderCreateInterface;
}

interface Props {
  show: boolean;

  onHide(): void;
}

const initialState: State = {
  show: 'products',
  loading: false,
  productListing: [],
  error: '',
  values: {
    listingIds: [],
    firstName: '',
    lastName: '',
    phoneNumber: '',
    deliveryAddress: {
      locality: '',
      location: {
        type: 'Point',
        coordinates: [0, 0],
      },
    },
    transport: TransportationType.BiCycle,
    instructions: '',
  },
};

const getInitialState = (): State => {
  return JSON.parse(JSON.stringify(initialState));
};

class OrderCreateModal extends Component<Props, State> {
  static contextType = AuthContext.Context;
  state = getInitialState();

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    if (this.props.show !== prevProps.show) {
      if (this.props.show) {
        this.getProducts();
      } else {
        this.setState(getInitialState());
      }
    }
  }

  setLoading(loading: boolean): void {
    this.setState({
      loading,
    });
  }

  getProducts(): void {
    this.setLoading(true);
    API.ProductListing.byStore({
      id: this.context.state.user?.store as string,
    })
      .then((response) => {
        console.log('byStore', response);
        this.setState({
          productListing: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setLoading(false);
        console.log(error);
      });
  }

  nextComponentShow(show: ComponentShow): void {
    this.setState({
      show,
    });
  }

  getEstimateRate(): void {
    API.Order.estimate(this.state.values)
      .then((response) => {
        console.log(response);
        this.nextComponentShow('courier');
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  createOrder(): void {
    API.Order.create(this.state.values)
      .then((response) => {
        console.log(response);
        this.nextComponentShow('success');
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  setListings(
    listingIds: OrderRequestItem[],
    next: 'products-quantity' | 'customer-info' | 'products',
  ): void {
    this.setState(
      {
        values: {
          ...this.state.values,
          listingIds,
        },
      },
      () => {
        this.nextComponentShow(next);
      },
    );
  }

  setCustomerInfo(customer: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
  }): void {
    this.setState(
      {
        values: {
          ...this.state.values,
          ...customer,
        },
      },
      () => {
        this.nextComponentShow('customer-address');
      },
    );
  }

  setDeliveryAddress(deliveryAddress: AddressInterface): void {
    this.setState(
      {
        values: {
          ...this.state.values,
          deliveryAddress,
        },
      },
      () => {
        this.nextComponentShow('courier');
      },
    );
  }

  setTransportType(transport: TransportationType, instructions: string): void {
    this.setState(
      {
        loading: true,
        values: {
          ...this.state.values,
          transport,
          instructions,
        },
      },
      () => {
        this.orderCreate();
      },
    );
  }

  orderCreate(): void {
    API.Order.create(this.state.values)
      .then((response) => {
        console.log(response);
        this.setState(
          {
            loading: false,
          },
          () => {
            this.nextComponentShow('success');
          },
        );
      })
      .catch((error) => {
        if (error.response) {
          this.setState({
            loading: false,
            error: error.response.data.message,
          });
        } else {
          this.setState({
            loading: false,
          });
        }

        toast.error(error.response.data.message);
        console.error(error.response);
      });
  }

  getComponent(): JSX.Element {
    switch (this.state.show) {
      case 'products':
        return (
          <Products
            productListing={this.state.productListing}
            listingIds={this.state.values.listingIds}
            next={(listingIds) => this.setListings(listingIds, 'products-quantity')}
          />
        );
      case 'products-quantity':
        return (
          <ProductsQuantity
            productListing={this.state.productListing}
            listingIds={this.state.values.listingIds}
            next={(listingIds) => this.setListings(listingIds, 'customer-info')}
            back={(listingIds) => this.setListings(listingIds, 'products')}
          />
        );

      case 'customer-info':
        return (
          <CustomerInfo
            next={(customer) => this.setCustomerInfo(customer)}
            back={() =>
              this.setState({
                show: 'products-quantity',
              })
            }
          />
        );
      case 'customer-address':
        return (
          <CustomerAddress next={(deliveryAddress) => this.setDeliveryAddress(deliveryAddress)} />
        );
      case 'courier':
        return (
          <CourierService
            estimateData={{
              deliveryAddress: this.state.values.deliveryAddress,
              listingIds: this.state.values.listingIds,
            }}
            error={this.state.error}
            next={(transport, instructions) => this.setTransportType(transport, instructions)}
          />
        );
      case 'success':
        return <OrderSuccess />;
      default:
        return <></>;
    }
  }

  getCircle(show: ComponentShow): JSX.Element {
    if (show === this.state.show) {
      return <span className="material-icons">stop_circle</span>;
    } else {
      return <span className="material-icons">radio_button_unchecked</span>;
    }
  }

  render(): JSX.Element {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered={true}
        backdrop="static">
        <div className="modal-body">
          {this.state.loading && <Loading />}
          <button className="close close-icon" type="button" onClick={() => this.props.onHide()}>
            <span className="material-icons">close</span>
          </button>
          <div className="dialog">
            {this.getComponent()}
            {this.state.show !== 'success' && (
              <div className="dialog-bullets-row">
                <div className="dialog-bullets">
                  {this.getCircle('products')}
                  {this.getCircle('products-quantity')}
                  {this.getCircle('customer-info')}
                  {this.getCircle('customer-address')}
                  {this.getCircle('courier')}
                  {this.getCircle('success')}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    );
  }
}

export default OrderCreateModal;
