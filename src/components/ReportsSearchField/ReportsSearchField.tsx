import React from 'react';
import images from '../../assets/img';
import classes from './ReportsSearchField.module.scss';
import clsx from 'clsx';
import { Dropdown } from 'react-bootstrap';

function ReportsSearchField(): JSX.Element {
  return (
    <>
      <div className={clsx('w-100', 'pl-1', classes.searchOrders)}>
        <p>Your earnings will be deposited in your bank account on the 9th day of each month </p>
      </div>
      <form className="form d-inline-flex flex-row justify-content-center align-items-end w-100">
        <div className={clsx('form-group', classes.formGroup)}>
          <div className={clsx('input-group', classes.inputGroup)}>
            <Dropdown className={classes.dateDropDown}>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className={classes.dateBtn}>
                All Reports
                <span className={clsx('material-icons', classes.downArow)}>expand_more</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <a className={clsx('dropdown-item')} href="#">
                  Action
                </a>
                <a className={clsx('dropdown-item')} href="#">
                  Action
                </a>
                <a className={clsx('dropdown-item')} href="#">
                  Action
                </a>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className={clsx('form-group', classes.formGroup)}>
          <label className={classes.label}>From</label>
          <div className={clsx('input-group', classes.inputGroup)}>
            <input
              type="text"
              className={clsx('form-control', classes.reportFromInput)}
              placeholder="22/12/2020"
            />
            <div className={clsx('input-group-append')}>
              <span
                className={clsx(classes.inputGroupText, classes.reportFromm, 'input-group-text')}>
                <span className={classes.reportFrom}>
                  <img src={images.reportFrom} className={classes.imgHeight} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className={clsx('form-group', classes.formGroup)}>
          <label className={classes.label}>Until</label>
          <div className={clsx('input-group', classes.inputGroup)}>
            <input
              type="text"
              className={clsx('form-control', classes.reportUntilInput)}
              placeholder="22/12/2020"
            />
            <div className={clsx('input-group-append')}>
              <span
                className={clsx(classes.inputGroupText, classes.reportUntill, 'input-group-text')}>
                <span className={classes.reportUntil}>
                  <img src={images.reportFrom} className={classes.imgHeight} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className={clsx('form-group', classes.formGroup)}>
          <label className={classes.label}>From</label>
          <div className={clsx('input-group', classes.inputGroup)}>
            <input
              type="text"
              className={clsx('form-control', classes.priceFromInput)}
              placeholder="₪200.00"
            />
            <div className={clsx('input-group-append')}>
              <span
                className={clsx(
                  classes.inputGroupText,
                  classes.reportPricefromm,
                  'input-group-text',
                )}>
                <span className={classes.reportPricefrom}>
                  <img src={images.reportPriceFrom} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className={clsx('form-group', classes.formGroup)}>
          <label className={classes.label}>Until</label>
          <div className={clsx('input-group', classes.inputGroup)}>
            <input
              type="text"
              className={clsx('form-control', classes.reportPriceUntill)}
              placeholder="₪3.00"
            />
            <div className={clsx('input-group-append')}>
              <span
                className={clsx(
                  classes.inputGroupText,
                  classes.reportPricefromm,
                  'input-group-text',
                )}>
                <span className={classes.reportPriceUntil}>
                  <img src={images.reportPriceFrom} />
                </span>
              </span>
            </div>
          </div>
        </div>
        <button type="button" className={clsx('btn ml-2 mr-2', classes.Advancesearch)}>
          Sort
        </button>
        <button type="button" className={clsx('btn', classes.darkBrown)}>
          Advance Search
        </button>
      </form>
    </>
  );
}

export default ReportsSearchField;
