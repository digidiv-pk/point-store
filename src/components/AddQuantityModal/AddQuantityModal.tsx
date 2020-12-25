import React, { FormEvent, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ProductListingInterface } from '../../shared/interface';
import '../../components/AddQuantityModal/AddQuantityModal.scss';
import { API } from '../../utility';

interface Props {
  show: boolean;
  productListing?: ProductListingInterface;
  onHide(): void;
}
function AddQuantityModal(props: Props): JSX.Element {
  const [quantity, setQuantity] = useState(0);
  const onSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    API.ProductListing.addQuantity({ listing: props.productListing!.id, qty: quantity })
      .then((response) => {
        console.log(response);
        props.onHide();
      })
      .catch((errors) => {
        console.error(errors.response);
      });
  };
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <div className="modal-body notification">
        <form onSubmit={onSave}>
          <div className="form-group">
            <div className="add-quantity-main">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Add Quantity"
                required={true}
                onChange={(event) => {
                  setQuantity(Number(event.target.value));
                }}
              />
              <button type="submit" className="btn save-btn btn-primary float-right mt-3 ml-2">
                Save
              </button>
              <button
                type="button"
                className="btn btn-light float-right mt-3"
                onClick={props.onHide}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
}
export default AddQuantityModal;
