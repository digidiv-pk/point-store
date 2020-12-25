import clsx from 'clsx';
import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { AuthContext, LanguageContext } from '../../context';
import { ProductSuggestionEnum } from '../../shared/enum';
import {
  AddProductInterface,
  ProductCategoryInterface,
  ProductInterface,
} from '../../shared/interface';
import { ProductSuggestionListInterface } from '../../shared/interface/ProductSuggestion.interface';
import { API } from '../../utility';
import { Loading, ProductItem } from '../index';
import classes from './AddNewItems.module.scss';

interface Props {
  show: boolean;
  products: string[];

  onHide(): void;

  onClickAddNewItem(): void;
}

interface State {
  product?: ProductInterface;
  category?: ProductCategoryInterface;
}

function AddNewItems(props: Props): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  const [productCategory, setProductCategory] = useState<ProductCategoryInterface[]>([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [productSuggestions, setProductSuggestions] = useState<ProductSuggestionListInterface[]>(
    [],
  );
  const [selectProductSuggestion, setSelectProductSuggestion] = useState<
    ProductSuggestionListInterface
  >({
    id: '',
    status: ProductSuggestionEnum.Requested,
    category: '',
    description: '',
    image: '',
    retail: 0,
    title: '',
    weight: 0,
  });
  const [state, setState] = useState<State>({});
  const [loading, setLoading] = useState<string[]>([]);
  const [suggested, setSuggested] = useState<ProductSuggestionEnum | null>(null);
  const resetSelectedProductSuggestion = () => {
    setSelectProductSuggestion({
      id: '',
      status: ProductSuggestionEnum.Requested,
      category: '',
      description: '',
      title: '',
      image: '',
      retail: 0,
      weight: 0,
    });
  };
  const updateLoading = (status: boolean) => {
    setLoading((prevState) => {
      const newState = [...prevState];
      if (status) {
        newState.push('');
      } else {
        newState.pop();
      }
      return newState;
    });
  };
  const context = useContext(AuthContext.Context);
  const [productSelected, setProductSelected] = useState<string[]>([]);
  useEffect(() => {
    if (props.show) {
      updateLoading(true);
      API.ProductCategory.byStoreCategory({
        id: context.state.store?.category as string,
      })
        .then((response) => {
          console.log('ProductCategory.byStoreCategory', response);
          setState((prevState) => {
            return {
              ...prevState,
              category: response.data[0],
            };
          });
          updateLoading(false);
          setProductCategory(response.data);
        })
        .catch((error) => {
          updateLoading(false);
          console.log(error.response);
        });
      updateLoading(true);
      API.Product.getAll()
        .then((response) => {
          console.log(
            response.data.map((item) => item.id),
            props.products,
          );
          updateLoading(false);
          setProducts(response.data);
          if (response.data.length) {
            setState((prevState) => {
              return {
                ...prevState,
                product: undefined,
              };
            });
          }
        })
        .catch((error) => {
          updateLoading(false);
          console.log(error.response);
        });
      updateLoading(true);
      API.ProductSuggestion.byStore()
        .then((response) => {
          updateLoading(false);
          setProductSuggestions(response.data);
        })
        .catch((error) => {
          console.error(error.response);
          updateLoading(false);
        });
    }
  }, [props]);

  useEffect(() => {
    if (!productSelected.length) {
      setState({
        ...state,
        product: undefined,
      });
    }
  }, [productSelected]);

  const selectProduct = (id: string) => {
    const selected = [...productSelected];
    if (selected.includes(id)) {
      selected.splice(
        selected.findIndex((item) => item === id),
        1,
      );
    } else {
      selected.push(id);
    }
    setProductSelected(selected);
  };

  const addProduct = (event: MouseEvent<HTMLButtonElement>) => {
    const data: AddProductInterface[] = [];
    productSelected.forEach((item) => {
      data.push({
        store: context.state.user?.store as string,
        product: item,
        enabled: true,
      });
    });
    API.ProductListing.addProduct(data)
      .then((response) => {
        console.log(response);
        props.onHide();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      dialogClassName={classes.modal}>
      {!!loading.length && <Loading />}
      <div className="modal-header round" style={{ direction: languageContext.state.direction }}>
        <p className="modal-title">
          {languageContext.state.lang === 'en' && <>select items to be added to your store</>}
          {languageContext.state.lang === 'he' && <>בחר מוצרים להוסיף לחנות שלך</>}
        </p>
        <button
          className="close close-icon"
          type="button"
          style={{
            right: languageContext.state.direction === 'ltr' ? '15px' : 'unset',
            left: languageContext.state.direction === 'rtl' ? '15px' : 'unset',
            position: 'absolute',
          }}
          onClick={() => props.onHide()}>
          <span className="material-icons">close</span>
        </button>
      </div>
      <div
        className="modal-body pb-0 pt-0 pr-0"
        style={{ direction: languageContext.state.direction }}>
        <div className={clsx('row no-gutters', classes.row)}>
          <div className="col-2">
            <nav className={clsx('sidebar pt-2', classes.sidebar)}>
              <div
                className={clsx('add-btn mb-2', classes.suggestBtn)}
                onClick={props.onClickAddNewItem}>
                <span>
                  {languageContext.state.lang === 'en' && <>Suggest New Item</>}
                  {languageContext.state.lang === 'he' && <>הצעה מוצר חדש</>}
                </span>
                <span className="material-icons">add_circle_outline</span>
              </div>
              <ul>
                {productCategory.map((category) => (
                  <li
                    key={category.id}
                    className={clsx(
                      category.id === state.category?.id && !suggested ? 'active' : '',
                    )}
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setState({
                        ...state,
                        category,
                        product: undefined,
                      });
                      setSuggested(null);
                    }}>
                    {category.title}
                  </li>
                ))}
              </ul>
              <ul>
                <li>
                  <b>
                    {languageContext.state.lang === 'en' && <>Your Cost</>}
                    {languageContext.state.lang === 'he' && <>המוצרים שלך</>}
                  </b>
                </li>
                <li
                  style={{
                    cursor: 'pointer',
                  }}
                  className={clsx(suggested === 'Requested' ? 'active' : '')}
                  onClick={() => {
                    setSuggested(ProductSuggestionEnum.Requested);
                    resetSelectedProductSuggestion();
                  }}>
                  {languageContext.state.lang === 'en' && <>Requested Items</>}
                  {languageContext.state.lang === 'he' && <>המוצרים שהצעת</>}
                </li>
                <li
                  style={{
                    cursor: 'pointer',
                  }}
                  className={clsx(suggested === 'Approved' ? 'active' : '')}
                  onClick={() => {
                    setSuggested(ProductSuggestionEnum.Approved);
                    resetSelectedProductSuggestion();
                  }}>
                  {languageContext.state.lang === 'en' && <>Approved Items</>}
                  {languageContext.state.lang === 'he' && <>מוצרים מאושרים</>}
                </li>
                <li
                  style={{
                    cursor: 'pointer',
                  }}
                  className={clsx(suggested === 'Rejected' ? 'active' : '')}
                  onClick={() => {
                    setSuggested(ProductSuggestionEnum.Rejected);
                    resetSelectedProductSuggestion();
                  }}>
                  {languageContext.state.lang === 'en' && <>Rejected Items</>}
                  {languageContext.state.lang === 'he' && <>מוצרים לא מאושרים</>}
                </li>
              </ul>
            </nav>
          </div>
          {!suggested && (
            <div
              className="col-7 pt-2 d-inline-flex justify-content-start align-items-start flex-wrap px-1"
              style={{
                gap: '5px',
              }}>
              {products
                .filter((item) => {
                  let status = false;
                  productCategory.forEach((c) => {
                    if (c.id === item.category) {
                      status = true;
                    }
                  });
                  return status;
                })
                .filter((item) => {
                  if (state.category) {
                    return item.category === state.category?.id;
                  } else {
                    return item;
                  }
                })
                .map((product) => (
                  <ProductItem
                    item={product}
                    selected={false}
                    key={product.id}
                    active={productSelected.includes(product.id)}
                    readonly={props.products.includes(product.id)}
                    disabled={false}
                    onClick={(e) => {
                      setState({
                        ...state,
                        product,
                      });
                      if (!props.products.includes(product.id)) {
                        selectProduct(product.id);
                      }
                    }}
                  />
                ))}
            </div>
          )}
          {!!suggested && (
            <div
              className="col-7 pt-2 d-inline-flex justify-content-start align-items-start flex-wrap px-1"
              style={{
                gap: '5px',
              }}>
              {productSuggestions
                .filter((item) => {
                  return item.status === suggested;
                })
                .map((product) => (
                  <ProductItem
                    item={{
                      ...product,
                      storeFacing: 0,
                      enabled: true,
                    }}
                    selected={false}
                    key={product.id}
                    active={productSelected.includes(product.id)}
                    readonly={props.products.includes(product.id)}
                    disabled={false}
                    onClick={(e) => {
                      setSelectProductSuggestion(product);
                    }}
                  />
                ))}
            </div>
          )}

          {!suggested && (
            <div className="col-3">
              {!!state.product && (
                <div className={clsx('item-details pr-1', classes.details)}>
                  <img className="img" src={state.product?.image} alt="image for product" />
                  <div className="title mb-2">{state.product?.title}</div>
                  <div className="description mb-2">
                    <p>
                      <b>
                        {languageContext.state.lang === 'en' && <>Ingredients</>}
                        {languageContext.state.lang === 'he' && <>מרכיבים</>}
                      </b>
                    </p>
                    <p>{state.product?.description}</p>
                  </div>
                  <div className="weight mb-2">
                    {languageContext.state.lang === 'en' && <>Weight: </>}
                    {languageContext.state.lang === 'he' && <>משקל: </>} {state.product?.weight}
                    {languageContext.state.lang === 'en' && <>gram</>}
                    {languageContext.state.lang === 'he' && <>גרם</>}
                  </div>
                  <div className="price mb-3">
                    <div className="title">
                      {languageContext.state.lang === 'en' && <>Price:</>}
                      {languageContext.state.lang === 'he' && <>מחיר:</>}
                    </div>
                    <div className="amount">{state.product?.retail} Shekel</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!!suggested && (
            <div className="col-3">
              {!!selectProductSuggestion.id && (
                <div className={clsx('item-details pr-1', classes.details)}>
                  <div className="img" />
                  <div className="title mb-2">{selectProductSuggestion.title}</div>
                  <div className="description mb-2">
                    <p>
                      <b>Ingredients</b>
                    </p>
                    <p>{selectProductSuggestion.description}</p>
                  </div>
                  <div className="weight mb-2">Weight: {selectProductSuggestion.weight}g</div>
                  <div className="price mb-3">
                    <div className="title">
                      {languageContext.state.lang === 'en' && <>Price:</>}
                      {languageContext.state.lang === 'he' && <>מחיר:</>}
                    </div>
                    <div className="amount">{selectProductSuggestion.retail} Shekel</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {!!productSelected.length && (
        <div className="row footer w-100 py-2">
          <div className="foter">
            <button
              className="btn btn-secondary float-right add-item mt-4"
              type="button"
              onClick={addProduct}>
              {languageContext.state.lang === 'en' && <>Add Item</>}
              {languageContext.state.lang === 'he' && <>הוסף פריט</>}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default AddNewItems;
