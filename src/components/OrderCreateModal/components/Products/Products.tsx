import React, { useEffect, useState } from 'react';
import { OrderRequestItem, ProductListingInterface } from '../../../../shared/interface';
import { ProductItem } from '../../../index';

interface Props {
  productListing: ProductListingInterface[];
  listingIds: OrderRequestItem[];

  next(listingIds: OrderRequestItem[]): void;
}

function Products(props: Props): JSX.Element {
  const [selected, setSelected] = useState<OrderRequestItem[]>([]);
  useEffect(() => {
    setSelected(props.listingIds);
  }, []);

  const isSelected = (item: ProductListingInterface) => {
    let status = false;
    selected.forEach((i) => {
      if (i.listing === item.id) {
        status = true;
      }
    });
    return status;
  };

  const onClickProduct = (item: ProductListingInterface) => {
    if (isSelected(item)) {
      const items = [...selected];
      items.splice(
        items.findIndex((order) => order.listing === item.id),
        1,
      );
      setSelected(items);
    } else {
      setSelected([
        ...selected,
        {
          listing: item.id,
          quantity: 1,
        },
      ]);
    }
  };

  return (
    <>
      <div className="dialog-title">Select Products</div>
      <div className="dialog-desc">Select All Products that you want to buy</div>
      <div
        className="items pt-2 d-inline-flex justify-content-start align-items-start flex-wrap px-1"
        style={{
          gap: '5px',
        }}>
        {props.productListing.map((item, index) => (
          <>
            <ProductItem
              item={item.product}
              selected={false}
              key={item.product.id}
              active={isSelected(item)}
              readonly={false}
              disabled={false}
              onClick={(e) => {
                onClickProduct(item);
              }}
            />
          </>
        ))}
      </div>

      <button
        className="btn dialog-button"
        disabled={selected.length === 0}
        type="button"
        onClick={() => props.next(selected)}>
        Next
      </button>
    </>
  );
}

export default Products;
