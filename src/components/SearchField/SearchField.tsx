import { isMongoId } from 'class-validator';
import clsx from 'clsx';
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import images from '../../assets/img';
import { LanguageContext } from '../../context';
import { CartSearchFilterDTO } from '../../shared/dto/Cart';
import Validator from '../../utility/Validator';
import classes from './SearchField.module.scss';

interface Props {
  searchFilter: any;

  setSearchFilter(data: any): void;
}

interface State {
  date: string;
  time: string;
  orderNumber: string;
  from: number;
  to: number;
}

function SearchField(props: Props): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  const [state, setState] = useState<State>({
    date: '',
    time: '',
    orderNumber: '',
    from: 0,
    to: 0,
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]:
        event.target.type === 'number' ? Number(event.target.value) : event.target.value,
    });
  };

  const onSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: CartSearchFilterDTO = {};
    if (state.date && state.time) {
      data.createdAt = {
        from: new Date(`${state.date} ${state.time}`),
        to: new Date(`${state.date} ${state.time}`),
      };
    } else if (state.date) {
      data.createdAt = {
        from: new Date(`${state.date} ${new Date().toLocaleTimeString()}`),
        to: new Date(`${state.date} ${new Date().toLocaleTimeString()}`),
      };
    }
    if (state.orderNumber) {
      if (isMongoId(state.orderNumber)) {
        data.id = [state.orderNumber];
      }
    }
    if (state.from || state.to) {
      const retail: {
        min?: number;
        max?: number;
      } = {};
      data.retail = {};
      if (state.from) {
        retail.min = state.from;
      }

      if (state.to) {
        if (state.to > state.from) {
          retail.max = state.to;
        }
      }
      data.order = {
        retail,
      };
    }

    Validator.validate(CartSearchFilterDTO, data).then((plainData) => {
      props.setSearchFilter(plainData);
    });
  };
  return (
    <>
      <div className={clsx('w-100', 'pl-1', classes.searchOrders)}>
        <p
          style={{
            textAlign: languageContext.state.direction === 'ltr' ? 'left' : 'right',
          }}>
          {languageContext.state.lang === 'en' && <>Search Orders</>}
          {languageContext.state.lang === 'he' && <>חיפוש הזמנות</>}
        </p>
      </div>
      <form
        className={clsx(
          'form',
          'd-inline-flex',
          'flex-row',
          'justify-content-center',
          'align-items-center',
          'w-100',
          classes.formBackground,
        )}
        onSubmit={onSearch}>
        <div className={clsx('form-group', 'mb-2')}>
          <label className={clsx(classes.label, classes.dateLabel)}>
            {languageContext.state.lang === 'en' && <>Date</>}
            {languageContext.state.lang === 'he' && <>תאריך</>}
          </label>
          <div className={clsx('input-group', 'mb-3', classes.inputGroup)}>
            <div className={clsx(classes.dateBtn, 'input-group-prepend')}>
              <span className={clsx('material-icons', classes.downArrow)}>expand_more</span>
            </div>
            <input
              type="date"
              id="date-input"
              name="date"
              value={state.date}
              onChange={onChange}
              className={clsx('form-control', classes.dateInput)}
              placeholder="17/11/1993"
            />

            <label className={clsx(classes.dateAppend, 'input-group-append')} htmlFor="date-input">
              <span className={clsx(classes.calendar, 'input-group-text')}>
                <span className={classes.dateImg}>
                  <img src={images.DateIcon} />
                </span>
              </span>
            </label>
          </div>
        </div>
        <div className={clsx('form-group', 'mb-2')}>
          <label className={classes.label}>
            {languageContext.state.lang === 'en' && <>Time</>}
            {languageContext.state.lang === 'he' && <>שעה</>}
          </label>
          <div className={clsx('mb-3', 'input-group', classes.inputGroup)}>
            <div className={clsx(classes.timePrepend, 'input-group-prepend')}>
              <label
                className={clsx(classes.inputGroupText, classes.time, 'input-group-text')}
                htmlFor="time-input">
                <span className={classes.timeImg}>
                  <img src={images.timeIcon} />
                </span>
              </label>
            </div>
            <input
              type="time"
              id="time-input"
              name="time"
              value={state.time}
              onChange={onChange}
              className={clsx('form-control', classes.timeInput)}
              placeholder="12:45"
            />
          </div>
        </div>

        <div className={clsx('mb-2', 'form-group')}>
          <label className={classes.label}>
            {languageContext.state.lang === 'en' && <>Order Number:</>}
            {languageContext.state.lang === 'he' && <>מספר הזמנה</>}
          </label>
          <div className={clsx('mb-3', 'input-group', classes.inputGroup)}>
            <div className={clsx('input-group-prepend', classes.orderPrepend)}>
              <span
                className={clsx(classes.inputGroupText, classes.orderNumber, 'input-group-text')}>
                <span className={classes.orderImg}>
                  <img src={images.orderNo} />
                </span>
              </span>
            </div>
            <input
              type="text"
              name="orderNumber"
              value={state.orderNumber}
              onChange={onChange}
              className={clsx('form-control', classes.orderNumberInput)}
              placeholder="Point:18267262"
            />
          </div>
        </div>
        <div className={clsx('form-group', 'mb-2')}>
          <label className={classes.label}>
            {languageContext.state.lang === 'en' && <>From</>}
            {languageContext.state.lang === 'he' && <>מ</>}
          </label>
          <div className={clsx('mb-3', 'input-group', classes.inputGroup)}>
            <div className={clsx(classes.pricePrepend, 'input-group-prepend')}>
              <span className={clsx(classes.priceText, 'input-group-text')}>
                <span className={classes.priceImg}>
                  <img src={images.priceIcon} alt="price" />
                </span>
              </span>
            </div>
            <input
              type="number"
              name="from"
              value={state.from}
              min={0}
              onChange={onChange}
              className={clsx(classes.priceInput, 'form-control')}
              placeholder="from"
            />
          </div>
        </div>
        <div className={clsx('form-group', 'mb-2')}>
          <label className={classes.label}>
            {languageContext.state.lang === 'en' && <>To</>}
            {languageContext.state.lang === 'he' && <>ל</>}
          </label>
          <div className={clsx('mb-3', 'input-group', classes.inputGroup)}>
            <div className={clsx(classes.pricePrepend, 'input-group-prepend')}>
              <span className={clsx(classes.priceText, 'input-group-text')}>
                <span className={classes.priceImg}>
                  <img src={images.priceIcon} alt="price" />
                </span>
              </span>
            </div>
            <input
              type="number"
              name="to"
              min={0}
              value={state.to}
              onChange={onChange}
              className={clsx(classes.priceInput, 'form-control')}
              placeholder="To"
            />
          </div>
        </div>
        <button className={clsx('btn', classes.searchBtn)}>
          {languageContext.state.lang === 'en' && <>Search</>}
          {languageContext.state.lang === 'he' && <>חיפוש</>}
        </button>
      </form>
    </>
  );
}

export default SearchField;
