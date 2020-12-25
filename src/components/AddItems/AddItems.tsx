import clsx from 'clsx';
import React, { ChangeEvent, createRef, FormEvent, useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import images from '../../assets/img';
import { AuthContext, LanguageContext } from '../../context';
import { ProductSuggestionInterface } from '../../shared/interface/ProductSuggestion.interface';
import { API } from '../../utility';
import { Loading } from '../index';

interface Props {
  show: boolean;

  onHide(): void;
}

function AddItems(props: Props): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<ProductSuggestionInterface>({
    category: '',
    description: '',
    title: '',
    image: '',
    retail: 1,
    weight: 1,
  });
  const context = useContext(AuthContext.Context);
  const ref = createRef<HTMLInputElement>();

  const getProductCategory = () => {
    setLoading(true);
    API.ProductCategory.byStoreCategory({
      id: context.state.store?.category as string,
    })
      .then((response) => {
        console.log(response);
        setCategories(response.data.map((item) => item.title));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    getProductCategory();
  }, []);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.type === 'number' ? Number(event.target.value) : event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
    });
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const formData = new FormData();
      formData.append('file', files[0]);
      setLoading(true);
      API.Media.upload(formData)
        .then((response) => {
          console.log(response);
          setState((prevState) => {
            const newState = { ...prevState };
            newState.image = response.data.path;
            return newState;
          });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
    }
  };

  const submitData = (event: FormEvent) => {
    event.preventDefault();
    API.ProductSuggestion.suggest(state)
      .then((response) => {
        console.log(response);
        toast.success('Product Suggested Successfully');
        props.onHide();
      })
      .catch((error) => {
        console.error(error.response);
        toast.success('Error During Suggest Product');
      });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered={true}>
      <div className="modal-header round" style={{ direction: languageContext.state.direction }}>
        {loading && <Loading />}
        <p className="modal-title">
          {languageContext.state.lang === 'en' && <>Add New Item</>}
          {languageContext.state.lang === 'he' && <>הוסף פריט חדש</>}
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
      <form onSubmit={submitData} style={{ direction: languageContext.state.direction }}>
        <div className="modal-body">
          <div className="modal1-main">
            <div className="add-item-form">
              <form>
                <div className="form-row">
                  <div className="col form-group">
                    <label htmlFor="title">
                      {languageContext.state.lang === 'en' && <>Name</>}
                      {languageContext.state.lang === 'he' && <>שֵׁם</>}
                    </label>
                    <br />
                    <input
                      className="form-control"
                      id="title"
                      placeholder="Name"
                      name="title"
                      type="text"
                      required={true}
                      value={state.title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col form-group">
                    <label htmlFor="weight">
                      {languageContext.state.lang === 'en' && <>Weight</>}
                      {languageContext.state.lang === 'he' && <>מִשׁקָל</>}
                    </label>
                    <br />
                    <input
                      className="form-control"
                      id="weight"
                      placeholder="Weight"
                      name="weight"
                      required={true}
                      type="number"
                      value={state.weight}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col form-group">
                    <label htmlFor="retail">
                      {languageContext.state.lang === 'en' && <>Price</>}
                      {languageContext.state.lang === 'he' && <>מחיר</>}
                    </label>
                    <br />
                    <input
                      className="form-control"
                      id="retail"
                      placeholder="Price"
                      name="retail"
                      required={true}
                      type="number"
                      value={state.retail}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group description">
                  <label htmlFor="description">
                    {languageContext.state.lang === 'en' && <>Description</>}
                    {languageContext.state.lang === 'he' && <>תיאור</>}
                  </label>
                  <br />
                  <textarea
                    className="text-area form-control"
                    id="description"
                    required={true}
                    name="description"
                    value={state.description}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
            </div>
            <div className="row">
              <div className="col-11 categories-list">
                <div className="title">
                  <p>
                    {languageContext.state.lang === 'en' && <>Category</>}
                    {languageContext.state.lang === 'he' && <>קטגוריה</>}
                  </p>
                </div>
                <div className="badges">
                  {categories.map((item) => (
                    <span
                      key={item}
                      style={{
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setState({
                          ...state,
                          category: item,
                        });
                      }}
                      className={clsx(
                        'badge badge-pill',
                        state.category === item ? 'badge-primary' : 'badge-dark',
                      )}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-1 add-category-btn">
                <img alt="" src={images.AddCategoryIcon} />
              </div>
            </div>
          </div>
          <div className="add-image my-3">
            {!state.image && (
              <div
                className="add-image-btn"
                onClick={() => (ref.current as HTMLInputElement).click()}>
                <img alt="" src={images.AddImgIcon} />
                <span>
                  {languageContext.state.lang === 'en' && <>Add image</>}
                  {languageContext.state.lang === 'he' && <>להוסיף תמונה</>}
                </span>
              </div>
            )}

            {!!state.image && (
              <div className="add-image-btn">
                <img alt="" src={state.image} height="80" />
              </div>
            )}

            <input type="file" accept="image/*" hidden={true} ref={ref} onChange={onChangeFile} />
          </div>
          <div className="clearfix">
            <button className="btn btn-secondary float-right add-item" type="submit">
              {languageContext.state.lang === 'en' && <>Add Item</>}
              {languageContext.state.lang === 'he' && <>הוסף פריט</>}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default AddItems;
