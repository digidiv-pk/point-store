import React from 'react';
import { LanguageContextInterface } from './LanguageContext.interface';

const LanguageContext = React.createContext<LanguageContextInterface>({
  state: {
    direction: 'ltr',
    lang: 'en',
  },
  action: {
    changeLanguage: (lang: string) => {},
  },
});
export default LanguageContext;
