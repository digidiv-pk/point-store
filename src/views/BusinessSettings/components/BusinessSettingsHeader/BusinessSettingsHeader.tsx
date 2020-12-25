import React, { memo, useContext } from 'react';
import clsx from 'clsx';
import { AuthContext, LanguageContext } from '../../../../context';
import classes from './BusinessSettingsHeader.module.scss';
import icons from 'assets/icons';

function BusinessSettingsHeader(): JSX.Element {
  const context = useContext(AuthContext.Context);
  const languageContext = useContext(LanguageContext.Context);
  return (
    <div className={clsx('row no-gutters', classes.row)}>
      <div className="col-6 left">
        <div className="text-data">
          <h5>{context.state.store?.title}</h5>
          <span>
            {languageContext.state.lang === 'en' && <>Business Name</>}
            {languageContext.state.lang === 'he' && <>שם העסק</>}
          </span>
        </div>
        <div className="edit-icon" style={{ visibility: 'hidden' }}>
          <img src={icons.editIconWhite} alt="edit icons" />
        </div>
      </div>
      <div className="col-6 right">
        <div className="text-data">
          <h5>
            {context.state.store?.link || window.location.origin + '/' + context.state.user?.store}
          </h5>
          <span>
            {languageContext.state.lang === 'en' && <>Website</>}
            {languageContext.state.lang === 'he' && <>קישור החנות</>}
          </span>
        </div>
        <div className="edit-icon" style={{ visibility: 'hidden' }}>
          <img src={icons.editIconWhite} alt="edit icons" />
        </div>
      </div>
    </div>
  );
}

export default memo(BusinessSettingsHeader);
