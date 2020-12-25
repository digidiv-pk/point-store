import React, { useContext } from 'react';
import { PageTitle } from '../../components';
import { AuthContext, LanguageContext } from '../../context';
import { AuthContextInterface } from '../../context/AuthContext/AuthContext.interface';
import { SecuritySettings } from './components';

function UserSettings(): JSX.Element {
  const context: AuthContextInterface = useContext(AuthContext.Context);
  const languageContext = useContext(LanguageContext.Context);
  return (
    <div
      className="row p-4"
      style={{
        backgroundColor: '#fcfcfc',
      }}>
      <PageTitle title={languageContext.state.lang === 'en' ? 'User Settings' : 'שמתשמתורדגה'} />
      <div className="col-12">
        <h1
          style={{
            color: '#1e85b3',
            fontFamily: 'Rubik',
            fontSize: '35px',
            fontWeight: 'normal',
          }}>
          {context.state.store?.title}
        </h1>
      </div>
      <div className="col-12">
        <SecuritySettings />
      </div>
    </div>
  );
}

export default UserSettings;
