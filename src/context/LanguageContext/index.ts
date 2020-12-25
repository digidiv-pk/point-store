import { languagesObject } from './LanguageConstant';
import LanguageContext from './LanguageContext';
import LanguageContextProvider from './LanguageContextProvider';

export default {
  Context: LanguageContext,
  Provider: LanguageContextProvider,
  Consumer: LanguageContext.Consumer,
  Record: languagesObject,
};
