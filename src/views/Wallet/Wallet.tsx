import React, { useContext } from 'react';
import images from 'assets/img';
import { PageTitle } from '../../components';
import { LanguageContext } from '../../context';

function Wallet(): JSX.Element {
  const languageContext = useContext(LanguageContext.Context);
  return (
    <>
      <PageTitle title={languageContext.state.lang === 'en' ? 'Wallet' : 'ארנק'} />
      <div className="wallet-gallary">
        <div className="earnings">
          <p>
            {languageContext.state.lang === 'en' && (
              <>
                Your earnings will be deposited in your bank account on the 9th day of each month{' '}
              </>
            )}
            {languageContext.state.lang === 'he' && (
              <>הרווחים שלך יעברו לחשבון בנק שהגדרת ב-9 לחודש</>
            )}
          </p>
        </div>
        <div className="row no-gutters wallet-divs">
          <div className="gallary-main1">
            <div className="col-3 g1 gallary-content">
              <div className="wave-bg">
                <div className="edit-icon">
                  <img src={images.EditGIcon} />
                </div>
                <div className="gallary-inner-content">
                  <h2>₪ 6650</h2>
                  <p>
                    {languageContext.state.lang === 'en' && <>Total Monthly Earnings</>}
                    {languageContext.state.lang === 'he' && <>סה״כ רווחים החודש</>}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="gallary-main2">
            <div className="col-3 g2 gallary-content">
              <div className="wave-bg2">
                <div className="edit-icon">
                  <img src={images.EditGIcon} />
                </div>
                <div className="gallary-inner-content">
                  <h2>₪ 1650</h2>
                  <p className="pb-4">
                    {languageContext.state.lang === 'en' && <>Total Weekly Earnings</>}
                    {languageContext.state.lang === 'he' && <>סה״כ רווחים השבוע</>}
                  </p>
                  <p>+28%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="gallary-main3">
            <div className="col-3 g3 gallary-content">
              <div className="wave-bg3">
                <div className="edit-icon">
                  <img src={images.EditGIcon} />
                </div>
                <div className="gallary-inner-content">
                  <div className="g-icon">
                    <img src={images.g3Icon} alt="img" />
                  </div>
                  <h2>₪ 650</h2>
                  <p className="pb-4 mb-0">
                    {languageContext.state.lang === 'en' && <>Today’s Earnings</>}
                    {languageContext.state.lang === 'he' && <>סה״כ רווחים היום</>}
                  </p>
                  <p className="mb-0"> -15%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="gallary-main4">
            <div className="col-3 g4 gallary-content">
              <div className="wave-bg4">
                <div className="edit-icon">
                  <img src={images.EditGIcon} />
                </div>
                <div className="gallary-inner-content">
                  <div className="g-icon">
                    <img src={images.g4Icon} />
                  </div>
                  <h2>₪ 65</h2>
                  <p className="pb-4 mb-0">
                    {languageContext.state.lang === 'en' && <>Total # of Monthly Orders</>}
                    {languageContext.state.lang === 'he' && <>סה״כ מספר הזמנות החודש</>}
                  </p>
                  <p className=" mb-0"> -15%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Wallet;
