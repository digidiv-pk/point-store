import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import images from '../../assets/img';
import { AuthContext, LanguageContext } from '../../context';
import { API } from '../../utility';
import { SupportInterface } from '../../utility/api';

interface Props {
  show: boolean;

  onHide(): void;
}

function ContactUS(props: Props): JSX.Element {
  const context = useContext(AuthContext.Context);
  const languageContext = useContext(LanguageContext.Context);
  const [state, setState] = useState<SupportInterface>({
    email: '',
    description: '',
    phoneNumber: '',
    subject: '',
    userId: '',
    storeId: '',
  });

  useEffect(() => {
    setState({
      description: '',
      phoneNumber: '',
      subject: '',
      email: context.state.user?.email ? context.state.user?.email : '',
      userId: context.state.user?.id ? context.state.user?.id : '',
      storeId: context.state.user?.store ? context.state.user?.store : '',
    });
  }, [props.show]);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.persist();
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(state);
    API.Support.contactUs(state)
      .then((response) => {
        console.log(response);
        if (languageContext.state.lang === 'en') {
          toast.success('Your message has been sent successfully. We will contact you shortly.');
        } else if (languageContext.state.lang === 'he') {
          toast.success('פנייתכם התקבלה בהצלחה, אנו ניצור עמכם קשר בהקדם תודה');
        }

        props.onHide();
      })
      .catch((error) => {
        console.error(error.response);
      });
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered={true}>
      <div className="modal-header half-round">
        <p className="modal-title">
          {languageContext.state.lang === 'en' && <>Contact Us</>}
          {languageContext.state.lang === 'he' && <>צור קשר</>}
        </p>
        <button className="close close-icon" type="button" onClick={() => props.onHide()}>
          <span className="material-icons">close</span>
        </button>
      </div>
      <div className="modal-body contact">
        <div className="contact-section">
          <div className="contact-title">
            {languageContext.state.lang === 'en' && <>We’re here for you</>}
            {languageContext.state.lang === 'he' && <>אנחנו כאן בשבילך</>}
          </div>
          <div className="contact-desc">
            <p>
              {languageContext.state.lang === 'en' && <>Encountered a problem? Have a quetion?</>}
              {languageContext.state.lang === 'he' && <>?נתקלת בבעיה ?יש לך שאלות</>}
            </p>
            <p>
              {languageContext.state.lang === 'en' && <>We’re here to help!</>}
              {languageContext.state.lang === 'he' && <>!אנחנו כאן לעזור</>}
            </p>
          </div>
          <div className="contact-action-title">
            {languageContext.state.lang === 'en' && <>Choose one of these methods to contact us</>}
            {languageContext.state.lang === 'he' && <>בחר באחת מהאפשרויות ליצירת קשר</>}
          </div>
          <div className="row no-gutters">
            <div className="col-6">
              <div className="contact-action">
                <img alt="support" src={images.support} />
                <div className="contact-action-text">
                  <p>
                    <b>
                      {languageContext.state.lang === 'en' && <>Phone call</>}
                      {languageContext.state.lang === 'he' && <>מענה אנושי</>}
                    </b>
                  </p>
                  <p>Customer service: 02-999-70-86</p>
                  <p>Payment department: 02-999-70-86</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="contact-action">
                <img alt="support" src={images.Email} />
                <div className="contact-action-text">
                  <p>
                    <b>
                      {languageContext.state.lang === 'en' && <>Email</>}
                      {languageContext.state.lang === 'he' && <>אימייל</>}
                    </b>
                  </p>
                  <p>Customer service: support@pointcity.co.il</p>
                  <p>Payment department: payments@pointcity.co.il</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="contact-action">
                <img alt="support" src={images.Screen} />
                <div className="contact-action-text">
                  <p>
                    <b>
                      {languageContext.state.lang === 'en' && <>Working hours</>}
                      {languageContext.state.lang === 'he' && <>שעות פעילות</>}
                    </b>
                  </p>
                  <p>Sunday - Thursday: 8:00-20:00</p>
                  <p>Friday: 8:00-13:00</p>
                  <p>Saturday: 20:00-00:00</p>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="contact-action">
                <img alt="support" src={images.PinTwo} />
                <div className="contact-action-text">
                  <p>
                    <b>
                      {languageContext.state.lang === 'en' && <>Offices address</>}
                      {languageContext.state.lang === 'he' && <>כתובת המשרד</>}
                    </b>
                  </p>
                  <p>Ha’ashuach 7, Tel Aviv</p>
                  <p>9927336</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="email">
                    {languageContext.state.lang === 'en' && <>Email</>}
                    {languageContext.state.lang === 'he' && <>אימייל</>}
                  </label>
                  <input
                    className="form-control"
                    id="email"
                    placeholder="user@pointstore.com"
                    type="email"
                    name="email"
                    required={true}
                    value={state.email}
                    onChange={inputChangeHandler}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="subject">
                    {languageContext.state.lang === 'en' && <>Subject</>}
                    {languageContext.state.lang === 'he' && <>נושא</>}
                  </label>
                  <input
                    className="form-control"
                    id="subject"
                    placeholder="Topic"
                    type="text"
                    name="subject"
                    required={true}
                    value={state.subject}
                    onChange={inputChangeHandler}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="subject">
                    {languageContext.state.lang === 'en' && <>Message</>}
                    {languageContext.state.lang === 'he' && <>הודעה</>}
                  </label>
                  <textarea
                    className="form-control"
                    placeholder="אנא מלא את השדה"
                    name="description"
                    required={true}
                    onChange={inputChangeHandler}>
                    {state.description}
                  </textarea>
                </div>
              </div>
              <div className="col-12">
                <button className="btn" type="submit">
                  {languageContext.state.lang === 'en' && <>Send</>}
                  {languageContext.state.lang === 'he' && <>שלח</>}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default ContactUS;
