import React, { Component } from 'react';
import { languagesObject } from './LanguageConstant';
import LanguageContext from './LanguageContext';
import { Action, Language, LanguageType, State } from './LanguageContext.interface';

const state: State = {
  lang: 'he',
  direction: 'rtl',
};

class AuthContextProvider extends Component<any, State> implements Action {
  state: State = state;

  componentDidMount(): void {
    if (localStorage.getItem('language')) {
      const newState = JSON.parse(localStorage.getItem('language') as string) as State;
      this.setState(newState);
    }
  }

  changeLanguage = (lang: LanguageType): void => {
    const newState: Language = languagesObject[lang];
    localStorage.setItem('language', JSON.stringify(newState));
    this.setState(newState);
  };

  render(): JSX.Element {
    const context = {
      state: { ...this.state },
      action: {
        changeLanguage: this.changeLanguage,
      },
    };
    return (
      <LanguageContext.Provider value={context}>
        <div style={{ direction: this.state.direction }}>{this.props.children}</div>
      </LanguageContext.Provider>
    );
  }
}

export default AuthContextProvider;
