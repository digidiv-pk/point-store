import React, { Component } from 'react';
import images from '../../assets/img';
import {
  AddNewItems,
  EditItems,
  Loading,
  PageLocking,
  PageTitle,
  Pagination,
  ProductItem,
} from '../../components';
import AddItems from '../../components/AddItems';
import { AuthContext, LanguageContext } from '../../context';
import {
  PaginationInterface,
  ProductCategoryInterface,
  ProductListingInterface,
} from '../../shared/interface';
import { API } from '../../utility';
import { ProductsFilter } from './components';

interface State {
  show: {
    suggest: boolean;
    addNewItem: boolean;
    editItems: boolean;
    addQuantity: boolean;
  };
  values: {
    search: string;
  };
  data: {
    productListings: ProductListingInterface[];
    categories: ProductCategoryInterface[];
  };

  selected: {
    productListing: ProductListingInterface;
    category: ProductCategoryInterface;
  };
  pagination: PaginationInterface;
  loading: string[];
}

class ProductsVIew extends Component<any, State> {
  static contextType = AuthContext.Context;
  context: React.ContextType<typeof AuthContext.Context>;
  state: State = {
    show: {
      addNewItem: false,
      editItems: false,
      addQuantity: false,
      suggest: false,
    },
    values: {
      search: '',
    },
    pagination: {
      limit: 25,
      pages: 1,
      page: 1,
    },
    data: {
      productListings: [],
      categories: [],
    },
    selected: {
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
    },
    loading: [],
  };

  componentDidMount(): void {
    this.getProductListingByStore();
    this.getProductCategory();
  }

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<State>, snapshot?: any): void {
    if (!this.state.loading.length && !!prevState.loading.length) {
      this.setState((state) => {
        return {
          pagination: {
            ...state.pagination,
            pages: Math.ceil(this.getSearchedProducts().length / state.pagination.limit),
            page:
              Math.ceil(this.getSearchedProducts().length / this.state.pagination.limit) === 1
                ? 1
                : this.state.pagination.page,
          },
        };
      });
    }

    if (
      this.state.pagination.limit !== prevState.pagination.limit ||
      this.state.pagination.page !== prevState.pagination.page
    ) {
      this.setState({
        pagination: {
          ...this.state.pagination,
          pages: Math.ceil(this.getSearchedProducts().length / this.state.pagination.limit),
          page:
            Math.ceil(this.getSearchedProducts().length / this.state.pagination.limit) === 1
              ? 1
              : this.state.pagination.page,
        },
      });
    }
  }

  getProductListingByStore(): void {
    this.setState((state) => {
      return {
        loading: [...state.loading, ''],
      };
    });
    API.ProductListing.byStore({
      id: this.context.state.user?.store as string,
    })
      .then((response) => {
        console.log('byStore', response);
        this.setState((state) => {
          const newState = { ...state };
          newState.loading.pop();
          newState.data.productListings = response.data;
          if (!state.selected.productListing.id) {
            if (response.data.length) {
              newState.selected.productListing = response.data[0];
            }
          } else {
            const productListing = response.data.find(
              (listing) => listing.id === newState.selected.productListing.id,
            );
            if (!!productListing) {
              newState.selected.productListing = productListing;
            }
          }
          return newState;
        });
      })
      .catch((error) => {
        this.setState((state) => {
          const loading = [...state.loading];
          loading.pop();
          return {
            loading,
          };
        });
        console.log(error.response);
      });
  }

  getProductCategory = (): void => {
    this.setState((state) => {
      return {
        loading: [...state.loading, ''],
      };
    });
    API.ProductCategory.byStoreCategory({
      id: this.context.state.store?.category as string,
    })
      .then((response) => {
        console.log('byStoreCategory', response);
        this.setState((state) => {
          const newState = { ...state };
          newState.loading.pop();
          newState.data.categories = response.data;
          newState.selected.category = response.data[0];
          return newState;
        });
      })
      .catch((error) => {
        console.log(error.response);
        this.setState((state) => {
          const loading = [...state.loading];
          loading.pop();
          return {
            loading,
          };
        });
      });
  };

  getSearchedProducts(): ProductListingInterface[] {
    return this.state.data.productListings
      .filter((item) => {
        return (
          item.product.description.includes(this.state.values.search) ||
          item.product.title.includes(this.state.values.search) ||
          item.product.title.includes(this.state.values.search)
        );
      })
      .filter((item) => item.enabled)
      .filter((item) => {
        if (!!this.state.selected.category.id) {
          return item.product.category === this.state.selected.category.id;
        } else {
          return true;
        }
      });
  }

  getPaginatedProducts(): ProductListingInterface[] {
    const productListing = this.getSearchedProducts();
    const skip = (this.state.pagination.page - 1) * this.state.pagination.limit;
    const limit = skip + this.state.pagination.limit;
    return productListing.filter((item, index) => index >= skip && index < limit);
  }

  setPagination = (pagination: PaginationInterface) => {
    this.setState({
      pagination,
    });
  };

  searchProducts = (data: { text: string; category: ProductCategoryInterface }) => {
    console.log(data);
    this.setState((state) => ({
      values: {
        search: data.text,
      },
      selected: {
        ...state.selected,
        category: data.category,
      },
    }));
  };

  showHideAddNewItem(status: boolean): void {
    this.setState(
      (state) => ({ show: { ...state.show, addNewItem: status } }),
      () => {
        if (!status) {
          this.getProductListingByStore();
        }
      },
    );
  }

  showHideEditItems(status: boolean): void {
    this.setState((state) => ({ show: { ...state.show, editItems: status } }));
  }

  showHideSuggestItems(status: boolean): void {
    this.setState((state) => ({ show: { ...state.show, suggest: status, addNewItem: !status } }));
  }

  setEditItem(productListing: ProductListingInterface): void {
    this.setState((state) => {
      return {
        show: { ...state.show, editItems: true },
        selected: {
          ...state.selected,
          productListing,
        },
      };
    });
  }

  render(): JSX.Element {
    return (
      <LanguageContext.Consumer>
        {({ state: contextState }) => (
          <>
            <PageTitle title={contextState.lang === 'en' ? 'Products' : 'מוצרים'} />
            {!!this.state.loading.length && <Loading />}
            <PageLocking page="products">
              <AddItems
                show={this.state.show.suggest}
                onHide={() => this.showHideSuggestItems(false)}
              />
              <AddNewItems
                show={this.state.show.addNewItem}
                onHide={() => this.showHideAddNewItem(false)}
                onClickAddNewItem={() => this.showHideSuggestItems(true)}
                products={this.state.data.productListings.map((item) => item.product.id)}
              />
              <EditItems
                show={this.state.show.editItems}
                onHide={() => this.showHideEditItems(false)}
                onUpdate={(listing) => {
                  this.setState(
                    (state) => {
                      return {
                        selected: { ...state.selected, productListing: listing },
                      };
                    },
                    () => {
                      this.getProductListingByStore();
                    },
                  );
                }}
                category={this.state.selected.category}
                categories={this.state.data.categories}
                productListing={this.state.selected.productListing}
                productListings={this.state.data.productListings}
                loading={!!this.state.loading.length}
              />
              <div className="row no-gutters blue-orange">
                <div className="col-6 blue">
                  <div className="row no-gutters blue-inner">
                    <div className="col-6 left-blue blue-content">
                      <div className="revenue">
                        <p>
                          {contextState.lang === 'en' && <>Products Available</>}
                          {contextState.lang === 'he' && <>מוצרים זמינים</>}
                        </p>
                      </div>
                    </div>
                    <div className="col-6 blue-content right-blue">
                      <div className="numbers">
                        <p>
                          {this.state.data.productListings.filter((item) => item.enabled).length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 orange">
                  <div className="row no-gutters blue-inner">
                    <div className="col-6 left-blue blue-content">
                      <div className="revenue">
                        <p>
                          {contextState.lang === 'en' && <>Products Unavailable</>}
                          {contextState.lang === 'he' && <>מוצרים זמינים</>}
                        </p>
                      </div>
                    </div>
                    <div className="col-6 blue-content right-blue">
                      <div className="numbers">
                        <p>
                          {this.state.data.productListings.filter((item) => !item.enabled).length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row no-gutters">
                <div className="col-12">
                  <div
                    className="add-product-container"
                    style={{
                      right: contextState.direction === 'ltr' ? '0' : undefined,
                      left: contextState.direction === 'rtl' ? '0' : undefined,
                      transform:
                        contextState.direction === 'ltr'
                          ? 'translate(-55px, -14px)'
                          : 'translate(55px, -14px)',
                    }}>
                    <div
                      className="add-product-button"
                      onClick={() => {
                        this.showHideAddNewItem(true);
                      }}>
                      <img src={images.addProductButton} alt="add products" />
                      <div className="button-body">
                        <span>
                          {contextState.lang === 'en' && <>Add Items</>}
                          {contextState.lang === 'he' && <>הוספת מוצר</>}
                        </span>
                        <span className="material-icons">add_circle_outline</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="add-product-container"
                    style={{
                      right: contextState.direction === 'ltr' ? '0' : undefined,
                      left: contextState.direction === 'rtl' ? '0' : undefined,
                      transform:
                        contextState.direction === 'ltr'
                          ? 'translate(-210px, -14px)'
                          : 'translate(210px, -14px)',
                    }}>
                    <div
                      className="add-product-button"
                      onClick={() => {
                        this.showHideEditItems(true);
                      }}>
                      <img src={images.addProductButton} alt="add products" />
                      <div className="button-body">
                        <span>
                          {contextState.lang === 'en' && <>Edit Items</>}
                          {contextState.lang === 'he' && <>ערוך מוצרים</>}
                        </span>
                        <span className="material-icons">edit</span>
                      </div>
                    </div>
                  </div>
                  <ProductsFilter
                    onSearch={this.searchProducts}
                    categories={this.state.data.categories}
                    category={this.state.selected.category}
                  />
                </div>
                <div
                  className="col-12 p-3 d-inline-flex justify-content-start align-items-start flex-wrap"
                  style={{
                    gap: '5px',
                  }}>
                  {this.getPaginatedProducts().map((listing, index) => (
                    <ProductItem
                      item={listing.product}
                      selected={false}
                      key={listing.id}
                      active={false}
                      readonly={false}
                      disabled={false}
                      action={
                        <>
                          <button
                            type="button"
                            className="dropdown-item"
                            onClick={(event) => {
                              event.stopPropagation();
                              this.setEditItem(listing);
                            }}>
                            Edit
                          </button>
                        </>
                      }
                      onClick={(e) => {
                        console.log(e);
                      }}
                    />
                  ))}
                </div>
                <div className="col-12">
                  <Pagination
                    pagination={this.state.pagination}
                    loading={!!this.state.loading.length}
                    limits={[5, 50, 100, 200]}
                    setPagination={this.setPagination}
                  />
                </div>
              </div>
            </PageLocking>
          </>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default ProductsVIew;
