// import AddNewItems from '../../components/AddNewItems';
import 'assets/scss/modals.scss';
import React from 'react';
import { PageTitle } from '../../components';
import AddItems from '../../components/AddItems';
import CartModal from '../../components/CartModal';
import ContactUS from '../../components/ContactUS';
import CourierNotification from '../../components/CourierNotification';
import CustomerInformation from '../../components/CustomerInformation';
import DliveryAddress from '../../components/DeliveryAddress';

function Modals(this: any): JSX.Element {
  const [addItems, setaddItems] = React.useState(false);
  // const [addNewItems, setaddNewItems] = React.useState(false);
  const [contactUS, setcontactUS] = React.useState(false);
  const [customerInformation, setcustomerInformation] = React.useState(false);
  const [deliveryAddress, setdeliveryAddress] = React.useState(false);
  const [courierNotification, setcourierNotification] = React.useState(false);
  const [cartModal, setCartModal] = React.useState<boolean>(false);

  return (
    <div className="outer-reports-table">
      <PageTitle title="Modals" />
      <AddItems show={addItems} onHide={() => setaddItems(false)} />
      <CartModal show={cartModal} onHide={() => setCartModal(false)} />

      <button
        className="btn btn-primary"
        data-target="#add-items"
        data-toggle="modal"
        type="button"
        onClick={() => setaddItems(true)}>
        Add Items
      </button>
      <button
        className="btn btn-primary"
        data-target="#add-items"
        data-toggle="modal"
        type="button"
        onClick={() => setCartModal(true)}>
        Cart Modal
      </button>

      {/*add new items button */}

      {/*<AddNewItems show={addNewItems} onHide={() => setaddNewItems(false)} products={[]} />*/}
      {/*<button*/}
      {/*  className="btn btn-primary"*/}
      {/*  data-target="#add-items"*/}
      {/*  data-toggle="modal"*/}
      {/*  type="button"*/}
      {/*  onClick={() => setaddNewItems(true)}>*/}
      {/*  Add New Items*/}
      {/*</button>*/}

      <ContactUS show={contactUS} onHide={() => setcontactUS(false)} />
      <button
        className="btn btn-primary"
        data-target="#contact"
        data-toggle="modal"
        type="button"
        onClick={() => setcontactUS(true)}>
        Contact Us
      </button>

      <CustomerInformation
        show={customerInformation}
        onHide={() => setcustomerInformation(false)}
      />
      <button
        className="btn btn-primary"
        data-target="#customer-information"
        data-toggle="modal"
        type="button"
        onClick={() => setcustomerInformation(true)}>
        Customer Information
      </button>
      <DliveryAddress show={deliveryAddress} onHide={() => setdeliveryAddress(false)} />
      <button
        className="btn btn-primary"
        data-target="#delivery-address"
        data-toggle="modal"
        type="button"
        onClick={() => setdeliveryAddress(true)}>
        Delivery Address
      </button>
      <CourierNotification
        show={courierNotification}
        onHide={() => setcourierNotification(false)}
      />
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => setcourierNotification(true)}>
        Courier Notification
      </button>
    </div>
  );
}

export default Modals;
