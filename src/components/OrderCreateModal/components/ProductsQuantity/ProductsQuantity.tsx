import React, { ChangeEvent, useEffect, useState } from 'react';
import { OrderRequestItem, ProductListingInterface } from '../../../../shared/interface';

interface Props {
  productListing: ProductListingInterface[];
  listingIds: OrderRequestItem[];

  next(listingIds: OrderRequestItem[]): void;

  back(listingIds: OrderRequestItem[]): void;
}

function ProductsQuantity(props: Props): JSX.Element {
  const [selected, setSelected] = useState<OrderRequestItem[]>([]);
  useEffect(() => {
    setSelected(props.listingIds);
  }, []);

  const removeSelectedItem = (item: ProductListingInterface) => {
    const items = [...selected];
    items.splice(
      items.findIndex((selectedItem) => selectedItem.listing === item.id),
      1,
    );
    setSelected(items);
  };

  const onChangeQuantity = (
    event: ChangeEvent<HTMLInputElement>,
    item: ProductListingInterface,
  ) => {
    const quantity: number = Number(event.target.value);
    if (quantity) {
      setSelected(
        selected.map((selectedItem) => {
          const newItem = selectedItem;
          if (newItem.listing === item.id) {
            newItem.quantity = quantity;
          }
          return newItem;
        }),
      );
    }
  };

  const getProductItem = (requestItem: OrderRequestItem): ProductListingInterface => {
    return props.productListing.find(
      (item) => requestItem.listing === item.id,
    ) as ProductListingInterface;
  };

  return (
    <>
      <div className="dialog-title">Products Cart</div>
      <div className="dialog-desc">Change Quantity of Product if required</div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: '300px' }}>Product Name</th>
            <th>Quantity</th>
            <th style={{ width: '100px' }}>Price</th>
            <th style={{ width: '150px' }}>Price Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {selected.map((requestItem) => {
            const item = getProductItem(requestItem);
            return (
              <tr key={item.id}>
                <td>{item.product.title}</td>
                <td>
                  <input
                    className="form-control"
                    type="number"
                    value={requestItem.quantity}
                    onChange={(event) => onChangeQuantity(event, item)}
                  />
                </td>
                <td>₪{item.product.retail}</td>
                <td>₪{item.product.retail * requestItem.quantity}</td>

                <td valign="middle">
                  <span
                    className="material-icons"
                    style={{
                      cursor: 'pointer',
                      verticalAlign: 'middle',
                      color: '#d82323',
                    }}
                    onClick={() => removeSelectedItem(item)}>
                    delete
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="clearfix">
        <button
          className="btn dialog-button float-left"
          disabled={selected.length === 0}
          type="button"
          onClick={() => props.back(selected)}>
          Back
        </button>
        <button
          className="btn dialog-button float-right"
          disabled={selected.length === 0}
          type="button"
          onClick={() => props.next(selected)}>
          Next
        </button>
      </div>
    </>
  );
}

export default ProductsQuantity;
