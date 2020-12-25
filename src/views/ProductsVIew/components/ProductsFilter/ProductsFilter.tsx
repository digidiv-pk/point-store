import clsx from 'clsx';
import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { DropdownButton } from 'react-bootstrap';
import { LanguageContext } from '../../../../context';
import { ProductCategoryInterface } from '../../../../shared/interface';
import classes from './ProductsFilter.module.scss';

interface Props {
  categories: ProductCategoryInterface[];
  category: ProductCategoryInterface;

  onSearch(data: { text: string; category: ProductCategoryInterface }): void;
}

interface State {
  category: ProductCategoryInterface;
  text: string;
}

function ProductsFilter(props: Props): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  const [state, setState] = useState<State>({
    text: '',
    category: {
      id: '',
      title: '',
      description: '',
      enabled: false,
    },
  });

  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (props.category) {
      setState({
        ...state,
        category: props.category,
      });
    }
  }, [props.category]);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    props.onSearch({
      text: state.text,
      category: state.category,
    });
  };

  return (
    <div className="row">
      <div className="col-12">
        <form className={clsx('form-inline', classes.form)} onSubmit={handleFormSubmit}>
          <div className={clsx('form-group', classes.selectGroup)}>
            <div className="input-group">
              <div className="input-group-prepend">
                <DropdownButton
                  onBlur={() => {
                    setTimeout(() => {
                      setShowDropdown(false);
                    }, 100);
                  }}
                  onClick={() => {
                    setShowDropdown(true);
                  }}
                  show={showDropdown}
                  title={<span className="material-icons">keyboard_arrow_down</span>}>
                  {props.categories.map((category) => (
                    <div
                      key={category.id}
                      className="dropdown-item"
                      onClick={() => {
                        setState({
                          ...state,
                          category,
                        });
                        props.onSearch({
                          text: state.text,
                          category,
                        });
                      }}>
                      {category.title}
                    </div>
                  ))}
                </DropdownButton>
              </div>
              <input
                type="text"
                readOnly={true}
                className="form-control"
                placeholder="Categories"
                value={state.category.title}
              />
            </div>
          </div>
          <div className={clsx('form-group', classes.searchGroup)}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="search-products"
                placeholder="Search"
                value={state.text}
                onChange={(event) => {
                  setState({
                    ...state,
                    text: event.target.value,
                  });
                }}
              />
              <label className="input-group-append" htmlFor="search-products">
                <span className="material-icons">search</span>
              </label>
            </div>
          </div>
          <button type="submit" className={clsx('btn ml-1', classes.searchButton)}>
            {languageContext.state.lang === 'en' && <>Search Product</>}
            {languageContext.state.lang === 'he' && <>חיפוש מוצרים</>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductsFilter;
