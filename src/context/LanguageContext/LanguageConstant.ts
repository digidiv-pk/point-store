import { LanguageType, Language } from './LanguageContext.interface';

export const languagesObject: Record<LanguageType, Language> = {
  en: {
    direction: 'ltr',
    lang: 'en',
  },
  he: {
    lang: 'he',
    direction: 'rtl',
  },
};
