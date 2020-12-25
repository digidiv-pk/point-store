import React from 'react';
import clsx from 'clsx';
import classes from './OrderManagementSearchField.module.scss';
import images from '../../assets/img';
import { Dropdown } from 'react-bootstrap';
interface Props {
  searchFilter: any;
  setSearchFilter(data: any): void;
}
function OrderManagementSearchField(props: Props): JSX.Element {
  return (
    <>
      <form className="form d-inline-flex flex-row justify-content-center align-items-end w-100">
        <div className={clsx('form-group', classes.formGroup)}>
          <div className={clsx('input-group', classes.inputGroup)}>
            <Dropdown className={classes.dateDropDown}>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className={classes.dateBtn}>
                Today
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
          <label className={classes.label}>To</label>
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
              placeholder="13:30"
            />
          </div>
        </div>
        <div className={clsx('form-group', classes.formGroup)}>
          <label className={classes.label}>To</label>
          <div className={clsx('input-group', classes.inputGroup)}>
            <input
              type="text"
              className={clsx('form-control', classes.reportPriceUntill)}
              placeholder="14:30"
            />
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
export default OrderManagementSearchField;
