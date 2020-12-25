import clsx from 'clsx';
import React, { memo, ChangeEvent, MouseEvent, useContext, useEffect, useState } from 'react';
import { isDate } from 'class-validator';
import icons from '../../../../assets/icons';
import { AuthContext, LanguageContext } from '../../../../context';
import { TimeRange } from '../../../../shared/interface';
import { API } from '../../../../utility';
import classes from './OperatingHours.module.scss';
import moment from 'moment';

function OperatingHours(): JSX.Element {
  const context = useContext(AuthContext.Context);
  const languageContext = useContext(LanguageContext.Context);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState<Record<string, TimeRange>>({
    sunday: {
      start: '2015-03-22T08:00:00Z',
      end: '2015-03-22T08:00:00Z',
    },
    monday: {
      start: '2015-03-23T08:00:00Z',
      end: '2015-03-23T08:00:00Z',
    },
    tuesday: {
      start: '2015-03-24T08:00:00Z',
      end: '2015-03-24T08:00:00Z',
    },
    wednesday: {
      start: '2015-03-25T08:00:00Z',
      end: '2015-03-25T08:00:00Z',
    },
    thursday: {
      start: '2015-03-26T08:00:00Z',
      end: '2015-03-26T08:00:00Z',
    },
    friday: {
      start: '2015-03-27T08:00:00Z',
      end: '2015-03-27T08:00:00Z',
    },
    saturday: {
      start: '2015-03-27T08:00:00Z',
      end: '2015-03-27T08:00:00Z',
    },
  });

  useEffect(() => {
    const daysString = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const days = {
      ...state,
    };
    context.state.store?.opens.forEach((item) => {
      let day: number | null = null;
      const start = new Date(item.start);
      const end = new Date(item.end);
      if (isDate(start)) {
        day = start.getDay();
      }
      if (isDate(end)) {
        day = end.getDay();
      }

      if (day !== null) {
        if (isDate(start)) {
          days[daysString[day]].start = start.toISOString();
        }
        if (isDate(end)) {
          days[daysString[day]].end = end.toISOString();
        }
      }
    });
    setState(days);
  }, [context]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget as HTMLInputElement;
    const value = target.value;
    const data = target.dataset;
    const days = { ...state };
    days[data.day as string][data.timeType as string] = new Date(
      new Date(days[data.day as string][data.timeType as string]).toLocaleDateString() +
        ' ' +
        value,
    ).toISOString();
    setState(days);
  };

  const onUpdate = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    API.Store.update(
      { id: context.state.user?.store as string },
      {
        opens: Object.values(state),
      },
    ).then((response) => {
      console.log(response);
      context.action.updateStore(response.data);
      setIsEdit(false);
    });
  };
  return (
    <section className={classes.section}>
      <div className="card">
        <div className="card-header">
          <div className="clearfix w-100">
            <div
              className={clsx({
                'float-left': languageContext.state.direction === 'ltr',
                'float-right': languageContext.state.direction === 'rtl',
              })}>
              {languageContext.state.lang === 'en' && <>Operating Hours for Orders</>}
              {languageContext.state.lang === 'he' && <>שעות פעילות להזמנות</>}
            </div>
            {!isEdit && (
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'rtl',
                  'float-right': languageContext.state.direction === 'ltr',
                })}>
                <img
                  src={icons.editIcon}
                  className="edit-btn"
                  alt="edit icon"
                  onClick={() => {
                    setIsEdit(true);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="card-body p-0">
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Sunday</>}
                {languageContext.state.lang === 'he' && <>ראשון</>}
              </div>
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'rtl',
                  'float-right': languageContext.state.direction === 'ltr',
                })}>
                {isEdit && (
                  <>
                    <input
                      type="time"
                      data-day="sunday"
                      data-time-type="start"
                      defaultValue={moment(state.sunday.start).format('HH:mm')}
                      onChange={onChange}
                    />
                    <input
                      type="time"
                      data-day="sunday"
                      data-time-type="end"
                      defaultValue={moment(state.sunday.end).format('HH:mm')}
                      onChange={onChange}
                    />
                  </>
                )}
                {!isEdit && (
                  <>
                    {moment(state.sunday.start).format('HH:mm')} -{' '}
                    {moment(state.sunday.end).format('HH:mm')}
                  </>
                )}
              </div>
            </div>
          </section>
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Monday</>}
                {languageContext.state.lang === 'he' && <>שני</>}
              </div>
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'rtl',
                  'float-right': languageContext.state.direction === 'ltr',
                })}>
                {isEdit && (
                  <>
                    <input
                      type="time"
                      data-day="monday"
                      data-time-type="start"
                      defaultValue={moment(state.monday.start).format('HH:mm')}
                      onChange={onChange}
                    />
                    <input
                      type="time"
                      data-day="monday"
                      data-time-type="end"
                      defaultValue={moment(state.monday.end).format('HH:mm')}
                      onChange={onChange}
                    />
                  </>
                )}
                {!isEdit && (
                  <>
                    {moment(state.monday.start).format('HH:mm')} -{' '}
                    {moment(state.monday.end).format('HH:mm')}
                  </>
                )}
              </div>
            </div>
          </section>
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Tuesday</>}
                {languageContext.state.lang === 'he' && <>שלישי</>}
              </div>
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'rtl',
                  'float-right': languageContext.state.direction === 'ltr',
                })}>
                {isEdit && (
                  <>
                    <input
                      type="time"
                      data-day="tuesday"
                      data-time-type="start"
                      defaultValue={moment(state.tuesday.start).format('HH:mm')}
                      onChange={onChange}
                    />
                    <input
                      type="time"
                      data-day="tuesday"
                      data-time-type="end"
                      defaultValue={moment(state.tuesday.end).format('HH:mm')}
                      onChange={onChange}
                    />
                  </>
                )}
                {!isEdit && (
                  <>
                    {moment(state.tuesday.start).format('HH:mm')} -{' '}
                    {moment(state.tuesday.end).format('HH:mm')}
                  </>
                )}
              </div>
            </div>
          </section>
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Wednesday</>}
                {languageContext.state.lang === 'he' && <>רביעי</>}
              </div>
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'rtl',
                  'float-right': languageContext.state.direction === 'ltr',
                })}>
                {isEdit && (
                  <>
                    <input
                      type="time"
                      data-day="wednesday"
                      data-time-type="start"
                      defaultValue={moment(state.wednesday.start).format('HH:mm')}
                      onChange={onChange}
                    />
                    <input
                      type="time"
                      data-day="wednesday"
                      data-time-type="end"
                      defaultValue={moment(state.wednesday.end).format('HH:mm')}
                      onChange={onChange}
                    />
                  </>
                )}
                {!isEdit && (
                  <>
                    {moment(state.wednesday.start).format('HH:mm')} -{' '}
                    {moment(state.wednesday.end).format('HH:mm')}
                  </>
                )}
              </div>
            </div>
          </section>
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Thursday</>}
                {languageContext.state.lang === 'he' && <>חמישי</>}
              </div>
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'rtl',
                  'float-right': languageContext.state.direction === 'ltr',
                })}>
                {isEdit && (
                  <>
                    <input
                      type="time"
                      data-day="thursday"
                      data-time-type="start"
                      defaultValue={moment(state.thursday.start).format('HH:mm')}
                      onChange={onChange}
                    />
                    <input
                      type="time"
                      data-day="thursday"
                      data-time-type="end"
                      defaultValue={moment(state.thursday.end).format('HH:mm')}
                      onChange={onChange}
                    />
                  </>
                )}
                {!isEdit && (
                  <>
                    {moment(state.thursday.start).format('HH:mm')} -{' '}
                    {moment(state.thursday.end).format('HH:mm')}
                  </>
                )}
              </div>
            </div>
          </section>
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Friday</>}
                {languageContext.state.lang === 'he' && <>שישי</>}
              </div>
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'rtl',
                  'float-right': languageContext.state.direction === 'ltr',
                })}>
                {isEdit && (
                  <>
                    <input
                      type="time"
                      data-day="friday"
                      data-time-type="start"
                      defaultValue={moment(state.friday.start).format('HH:mm')}
                      onChange={onChange}
                    />
                    <input
                      type="time"
                      data-day="friday"
                      data-time-type="end"
                      defaultValue={moment(state.friday.end).format('HH:mm')}
                      onChange={onChange}
                    />
                  </>
                )}
                {!isEdit && (
                  <>
                    {moment(state.friday.start).format('HH:mm')} -{' '}
                    {moment(state.friday.end).format('HH:mm')}
                  </>
                )}
              </div>
            </div>
          </section>
          <section>
            <div className="clearfix">
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'ltr',
                  'float-right': languageContext.state.direction === 'rtl',
                })}>
                {languageContext.state.lang === 'en' && <>Saturday</>}
                {languageContext.state.lang === 'he' && <>יום שבת</>}
              </div>
              <div
                className={clsx({
                  'float-left': languageContext.state.direction === 'rtl',
                  'float-right': languageContext.state.direction === 'ltr',
                })}>
                {isEdit && (
                  <>
                    <input
                      type="time"
                      data-day="saturday"
                      data-time-type="start"
                      defaultValue={moment(state.saturday.start).format('HH:mm')}
                      onChange={onChange}
                    />
                    <input
                      type="time"
                      data-day="saturday"
                      data-time-type="end"
                      defaultValue={moment(state.saturday.end).format('HH:mm')}
                      onChange={onChange}
                    />
                  </>
                )}
                {!isEdit && (
                  <>
                    {moment(state.saturday.start).format('HH:mm')} -{' '}
                    {moment(state.saturday.end).format('HH:mm')}
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
      {isEdit && (
        <>
          <button type="button" onClick={onUpdate} className="btn update-btn px-5">
            {languageContext.state.lang === 'en' && <>Update Business Information</>}
            {languageContext.state.lang === 'he' && <>עדכון מידע העסק</>}
          </button>
          <button
            type="submit"
            className="btn update-btn px-5 ml-2"
            onClick={() => setIsEdit(false)}>
            {languageContext.state.lang === 'en' && <>Cancel</>}
            {languageContext.state.lang === 'he' && <>לְבַטֵל</>}
          </button>
        </>
      )}
    </section>
  );
}

export default memo(OperatingHours);
