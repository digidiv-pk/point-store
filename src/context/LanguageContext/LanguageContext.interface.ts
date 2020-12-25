export declare type DirectionType =
  | 'ltr'
  | '-moz-initial'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'unset'
  | 'rtl'
  | undefined;

export declare type LanguageType = 'en' | 'he';

export interface State {
  lang: LanguageType;
  direction: DirectionType;
}

export interface Action {
  changeLanguage(lang: LanguageType): void;
}

export interface LanguageContextInterface {
  state: State;
  action: Action;
}

export interface Language {
  lang: LanguageType;
  direction: DirectionType;
}
