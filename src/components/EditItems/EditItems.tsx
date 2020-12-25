import clsx from 'clsx';
import React, { createRef, useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { LanguageContext } from '../../context';
import { ProductCategoryInterface, ProductListingInterface } from '../../shared/interface';
import { API } from '../../utility';
import { Loading, ProductItem } from '../index';

interface Props {
  show: boolean;
  loading: boolean;
  productListing: ProductListingInterface;
  productListings: ProductListingInterface[];
  category: ProductCategoryInterface;
  categories: ProductCategoryInterface[];

  onHide(): void;

  onUpdate(listing: ProductListingInterface): void;
}

interface State {
  productListing: ProductListingInterface;
  category: ProductCategoryInterface;
  addQuantityShow: boolean;
}

function EditItems(props: Props): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  const [state, setState] = useState<State>({
    category: {
      id: '',
      title: '',
      description: '',
      enabled: false,
    },
    productListing: {
      id: '',
      store: '',
      product: {
        id: '',
        title: '',
        category: '',
        description: '',
        weight: 0,
        retail: 0,
        storeFacing: 0,
        enabled: false,
      },
      enabled: false,
      qty: 0,
    },
    addQuantityShow: false,
  });

  const quantityRef = createRef<HTMLInputElement>();
  useEffect(() => {
    setState({
      ...state,
      category: props.category,
      productListing: props.productListing,
    });
  }, [props]);

  const changeProductState = () => {
    API.ProductListing.enable({
      listing: state.productListing.id,
      enable: !state.productListing.enabled,
    })
      .then((response) => {
        props.onUpdate(state.productListing);
      })
      .catch((errors) => {
        console.log(errors.response);
      });
  };

  const changeProductQuantity = (quantity: number) => {
    API.ProductListing.addQuantity({ listing: state.productListing.id, qty: quantity })
      .then((response) => {
        setState({
          ...state,
          addQuantityShow: false,
        });
        props.onUpdate(state.productListing);
      })
      .catch((errors) => {
        console.error(errors.response);
      });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered={true}>
      {props.loading && <Loading />}
      <div className="modal-header round" style={{ direction: languageContext.state.direction }}>
        <p className="modal-title">
          {languageContext.state.lang === 'en' && <>Edit Items</>}
          {languageContext.state.lang === 'he' && <>ערוך פריטים</>}
        </p>
        <button
          className="close close-icon"
          style={{
            right: languageContext.state.direction === 'ltr' ? '15px' : 'unset',
            left: languageContext.state.direction === 'rtl' ? '15px' : 'unset',
            position: 'absolute',
          }}
          type="button"
          onClick={() => props.onHide()}>
          <span className="material-icons">close</span>
        </button>
      </div>
      <div
        className="modal-body pb-0 pt-0 pr-0"
        style={{ direction: languageContext.state.direction }}>
        <div className="row no-gutters">
          <div className="col-2">
            <nav className="sidebar pt-2">
              <ul>
                {props.categories.map((category) => (
                  <li
                    key={category.id}
                    className={clsx(category.id === state.category?.id ? 'active' : '')}
                    onClick={() => {
                      setState({
                        ...state,
                        category,
                        productListing: {
                          id: '',
                          store: '',
                          product: {
                            id: '',
                            title: '',
                            category: '',
                            description: '',
                            weight: 0,
                            retail: 0,
                            storeFacing: 0,
                            enabled: false,
                          },
                          enabled: false,
                          qty: 0,
                        },
                      });
                    }}>
                    {category.title}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div
            className="col-7 pt-2 d-inline-flex justify-content-start align-items-start flex-wrap"
            style={{
              gap: '5px',
            }}>
            {props.productListings
              .filter((item) => {
                let status = false;
                props.categories.forEach((c) => {
                  if (c.id === item.product.category) {
                    status = true;
                  }
                });
                return status;
              })
              .filter((item) => {
                if (state.category) {
                  return item.product.category === state.category?.id;
                } else {
                  return item;
                }
              })
              .map((item) => (
                <ProductItem
                  item={item.product}
                  selected={false}
                  key={item.id}
                  active={item.id === state.productListing?.id}
                  readonly={false}
                  disabled={!item.enabled}
                  onClick={(e) => {
                    setState({
                      ...state,
                      productListing: item,
                    });
                  }}
                />
              ))}
          </div>
          <div className="col-3">
            {!!state.productListing.id && (
              <div className="item-details">
                <img
                  className="img"
                  src={state.productListing.product.image}
                  alt="image for product"
                />
                <div className="title mb-2">{state.productListing.product.title}</div>
                <div className="description mb-2">
                  <p>
                    <b>
                      {languageContext.state.lang === 'en' && <>Ingredients</>}
                      {languageContext.state.lang === 'he' && <>תיאור מוצר</>}
                    </b>
                  </p>
                  <p>{state.productListing.product.description}</p>
                </div>
                <div className="weight mb-2">
                  {languageContext.state.lang === 'en' && <>Weight: </>}
                  {languageContext.state.lang === 'he' && <>משקל </>}
                  {state.productListing.product.weight} g
                </div>
                <div className="price mb-3">
                  <div className="title">
                    {languageContext.state.lang === 'en' && <>Price</>}
                    {languageContext.state.lang === 'he' && <>מחיר</>}
                  </div>
                  <div className="amount">{state.productListing.product.retail} Shekel</div>
                </div>
                {!state.addQuantityShow && (
                  <div className="price mb-3">
                    <div className="title">
                      {languageContext.state.lang === 'en' && <>Quantity</>}
                      {languageContext.state.lang === 'he' && <>כמות</>}
                    </div>
                    <div className="amount">{state.productListing.qty}</div>
                  </div>
                )}
                {state.addQuantityShow && (
                  <div className="input-group mb-3">
                    <input
                      type="number"
                      defaultValue={state.productListing.qty}
                      ref={quantityRef}
                      className="form-control"
                      placeholder="Quantity"
                    />
                    <div
                      className="input-group-append"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        changeProductQuantity(
                          Number((quantityRef.current as HTMLInputElement).value),
                        );
                      }}>
                      <span className="input-group-text">
                        <span className="material-icons">save</span>
                      </span>
                    </div>
                  </div>
                )}

                <div className="action">
                  <ul>
                    <li onClick={changeProductState} style={{ cursor: 'pointer' }}>
                      {state.productListing.enabled && (
                        <>
                          <span className="material-icons pr-3">close</span>
                          {languageContext.state.lang === 'en' && <>Disable</>}
                          {languageContext.state.lang === 'he' && <>השבת</>}
                        </>
                      )}
                      {!state.productListing.enabled && (
                        <>
                          <span className="material-icons pr-3">check</span>
                          {languageContext.state.lang === 'en' && <>Enable</>}
                          {languageContext.state.lang === 'he' && <>Enable</>}
                        </>
                      )}
                    </li>

                    <li
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setState({
                          ...state,
                          addQuantityShow: true,
                        });
                      }}>
                      <span className="material-icons pr-3">edit</span>
                      {languageContext.state.lang === 'en' && <>Edit</>}
                      {languageContext.state.lang === 'he' && <>ערוך</>}
                    </li>
                    <li>
                      <span className="material-icons pr-3">remove_red_eye</span>
                      {languageContext.state.lang === 'en' && <>Hide</>}
                      {languageContext.state.lang === 'he' && <>הסתר</>}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EditItems;
