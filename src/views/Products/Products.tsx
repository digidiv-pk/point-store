import clsx from 'clsx';
import { AddNewItems, AddQuantityModal, Loading, PageLocking, PageTitle } from 'components';
import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import images from '../../assets/img';
import AddItems from '../../components/AddItems';
import { AuthContext } from '../../context';
import { ProductCategoryInterface, ProductListingInterface } from '../../shared/interface';
import { API } from '../../utility';
import './Products.scss';

interface State {
  productListing?: ProductListingInterface;
  category?: ProductCategoryInterface;
  search: string;
}

interface AddQuantityState {
  productListing?: ProductListingInterface;
  show: boolean;
}

function Products(): JSX.Element {
  const context = useContext(AuthContext.Context);
  const [suggestItem, setSuggestItem] = React.useState(false);
  const [productCategories, setProductCategories] = useState<ProductCategoryInterface[]>([]);
  const [productListing, setProductListing] = useState<ProductListingInterface[]>([]);
  const [state, setState] = useState<State>({ search: '' });
  const [loading, setLoading] = useState<any[]>([]);
  const [addNewItemShow, setAddNewItemShow] = useState(false);

  const [addQuantity, setAddQuantity] = React.useState<AddQuantityState>({
    show: false,
  });
  const getProductCategory = () => {
    setLoading([...loading, '']);
    API.ProductCategory.byStoreCategory({
      id: context.state.store?.category as string,
    })
      .then((response) => {
        console.log(response);
        setState({ ...state, category: response.data[0] });
        setProductCategories(response.data);
        const newLoading = [...loading];
        newLoading.pop();
        setLoading(newLoading);
      })
      .catch((error) => {
        const newLoading = [...loading];
        newLoading.pop();
        setLoading(newLoading);
        console.log(error.response);
      });
  };

  const getProductListingByStore = () => {
    setLoading([...loading, 1]);
    API.ProductListing.byStore({
      id: context.state.user?.store as string,
    })
      .then((response) => {
        console.log('byStore', response);
        setProductListing(response.data);
        const newLoading = [...loading];
        newLoading.pop();
        setLoading(loading);
      })
      .catch((error) => {
        const newLoading = [...loading];
        newLoading.pop();
        setLoading(loading);
        console.log(error.response);
      });
  };

  const getProductListingById = (id: string): ProductListingInterface | undefined => {
    return productListing.find((item): boolean => item.id === id);
  };

  useEffect(() => {
    getProductCategory();
    getProductListingByStore();
  }, []);

  useEffect(() => {
    console.log(addQuantity);
    if (!addQuantity.show) {
      getProductListingByStore();
    }
  }, [addQuantity]);

  useEffect(() => {
    if (!addNewItemShow) {
      getProductListingByStore();
    }
  }, [addNewItemShow]);

  const changeProductState = (enable: boolean, listing: string) => {
    API.ProductListing.enable({
      listing,
      enable,
    })
      .then((response) => {
        getProductListingByStore();
        const newState = { ...state };
        newState.productListing!.enabled = enable;
        setState(newState);
        console.log(response);
      })
      .catch((errors) => {
        console.log(errors.response);
      });
  };

  return (
    <>
      <PageTitle title="Products" />
      <AddItems show={suggestItem} onHide={() => setSuggestItem(false)} />
      <PageLocking page="products">
        {!!loading.length && <Loading />}
        <AddNewItems
          show={addNewItemShow}
          onHide={() => setAddNewItemShow(false)}
          onClickAddNewItem={() => setAddNewItemShow(false)}
          products={productListing.map((item) => item.product.id)}
        />
        <AddQuantityModal
          show={addQuantity.show}
          onHide={() =>
            setAddQuantity({
              show: false,
            })
          }
          productListing={addQuantity.productListing}
        />
        <div className="row no-gutters blue-orange">
          <div className="col-6 blue">
            <div className="d-arrow">
              <img src={images.downArrow} />
            </div>
            <div className="row no-gutters blue-inner">
              <div className="col-6 left-blue blue-content">
                <div className="revenue">
                  <p>Products Available</p>
                </div>
              </div>
              <div className="col-6 blue-content right-blue">
                <div className="numbers">
                  <p>{productListing.filter((item) => item.enabled).length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 orange">
            <div className="d-arrow">
              <img src={images.downArrow} />
            </div>
            <div className="row no-gutters blue-inner">
              <div className="col-6 left-blue blue-content">
                <div className="revenue">
                  <p>Products Unavailable</p>
                </div>
              </div>
              <div className="col-6 blue-content right-blue">
                <div className="numbers">
                  <p>{productListing.filter((item) => !item.enabled).length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row no-gutters" style={{ position: 'relative' }}>
          <div className="add-product-container">
            <div
              className="add-product-button"
              onClick={() => {
                setAddNewItemShow(true);
              }}>
              <img src={images.addProductButton} />
              <div className="button-body">
                <span>Add Product</span>
                <span className="material-icons">add_circle_outline</span>
              </div>
            </div>
          </div>
          <div className="col-2">
            <nav className="sidebar pt-2">
              <div
                className="add-btn mb-2"
                onClick={() => {
                  setSuggestItem(true);
                }}>
                <span>Suggest New Item</span>{' '}
                <span className="material-icons">add_circle_outline</span>
              </div>
              <ul>
                {productCategories.map((productCategory, index) => (
                  <li
                    key={index}
                    className={productCategory.id === state.category?.id ? 'active' : ''}
                    onClick={() => {
                      setState({
                        ...state,
                        category: productCategory,
                        productListing: undefined,
                      });
                    }}>
                    {productCategory.title}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="col-8 pt-3">
            <input
              type="text"
              placeholder="Search Products"
              className="form-control"
              value={state.search}
              onChange={(e) => {
                setState({
                  ...state,
                  search: e.target.value,
                });
              }}
            />
            <div className="row items">
              {productListing
                .filter((item) => {
                  let status = false;
                  productCategories.forEach((c) => {
                    if (c.id === item.product.category) {
                      status = true;
                    }
                  });
                  return status;
                })
                .filter((item) => {
                  if (state.category) {
                    return item.product.category === state.category.id;
                  } else {
                    return item;
                  }
                })
                .filter((item) => {
                  return (
                    item.product.description.includes(state.search) ||
                    item.product.title.includes(state.search) ||
                    item.product.title.includes(state.search) ||
                    item.product.category.includes(state.search)
                  );
                })
                .map((item, index) => (
                  <div
                    key={index}
                    className="col-4"
                    onClick={() => {
                      setState({
                        ...state,
                        productListing: item,
                      });
                    }}>
                    <div className="item">
                      <div
                        className={clsx(
                          'item-body',
                          item.product.id === state.productListing?.product.id ? 'active' : '',
                        )}>
                        {!item.enabled && <div className="disabled-tag">Disabled</div>}

                        <div className="item-action">
                          <DropdownButton
                            alignRight={true}
                            title={<span className="material-icons">more_horiz</span>}
                            id="dropdown-menu-align-right">
                            <Dropdown.Item className="p-2">
                              <button
                                type="button"
                                className="dropdown-item"
                                onClick={() => {
                                  setAddQuantity({
                                    productListing: item,
                                    show: true,
                                  });
                                }}>
                                Add Quantity
                              </button>
                            </Dropdown.Item>
                          </DropdownButton>
                        </div>
                      </div>
                      <div className="item-footer">
                        <div className="foot">
                          <div className="item-footer-text">{item.product.title}</div>
                          <div className="item-footer-oval">₪{item.product.retail}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-2">
            {state.productListing && (
              <div className="item-details">
                <div className="img" />
                <div className="title mb-2">
                  {getProductListingById(state.productListing.id)?.product.title}
                </div>
                <div className="description mb-2">
                  <p>
                    <b>Ingredients</b>
                  </p>
                  <p>{getProductListingById(state.productListing.id)?.product.description}</p>
                </div>
                <div className="weight mb-2">
                  Weight: {getProductListingById(state.productListing.id)?.product.weight}g
                </div>
                <div className="price mb-3">
                  <div className="title">Price</div>
                  <div className="amount">
                    {getProductListingById(state.productListing.id)?.product.retail} Shekel
                  </div>
                </div>
                <div className="price mb-3">
                  <div className="title">Quantity</div>
                  <div className="amount">
                    {getProductListingById(state.productListing.id)?.qty}
                  </div>
                </div>
                <div className="action">
                  <ul>
                    {getProductListingById(state.productListing.id)?.enabled && (
                      <li
                        onClick={() =>
                          changeProductState(
                            !state.productListing?.enabled,
                            state.productListing?.id as string,
                          )
                        }>
                        <span className="material-icons pr-3">close</span>
                        Disable
                      </li>
                    )}

                    {!state.productListing.enabled && (
                      <li
                        onClick={() =>
                          changeProductState(
                            !state.productListing?.enabled,
                            state.productListing?.id as string,
                          )
                        }>
                        <span className="material-icons pr-3">check</span>
                        Enable
                      </li>
                    )}

                    <li>
                      <span className="material-icons pr-3">edit</span>Edit
                    </li>
                    <li>
                      <span className="material-icons pr-3">remove_red_eye</span>
                      Hide
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageLocking>
    </>
  );
}

export default Products;
