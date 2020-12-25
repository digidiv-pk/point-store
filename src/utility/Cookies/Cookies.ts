import moment from 'moment';

export interface CookieData<T> {
  key: string;
  value: T;
  expiry?: Date;
  path?: string;
  domain?: string;
  maxAge?: number;
  secure?: boolean;
  sameSite?: 'lax' | 'strict' | 'none';
  session?: boolean;
}

interface CookiesList {
  [key: string]: string | object;
}

export class Cookies {
  public static all(): CookiesList {
    return document.cookie.split(';').reduce((res: any, c: string) => {
      const [key, ...val] = c.trim().split('=').map(decodeURIComponent);
      if (key) {
        try {
          return Object.assign(res, { [key]: JSON.parse(val.join('=')) });
        } catch (e) {
          return Object.assign(res, { [key]: val.join('=') });
        }
      }
    }, {});
  }

  public static get<T>(key: string): T | any {
    const keyName = key + '=';
    const cookie = document.cookie
      .split(';')
      .map((item) => decodeURIComponent(item.trim()))
      .find((item) => item.startsWith(keyName));
    if (cookie) {
      try {
        return JSON.parse(cookie.replace(keyName, ''));
      } catch (e) {
        return cookie.replace(keyName, '');
      }
    } else {
      return null;
    }
  }

  public static exist<T>(key: string): boolean {
    return !!Cookies.get<T>(key);
  }

  public static set<T>(data: CookieData<T>): void {
    let cookieData = '';
    try {
      cookieData = JSON.stringify(data.value);
    } catch (e) {
      cookieData = data.key;
    }
    let cookie = `${encodeURIComponent(data.key)}=${encodeURIComponent(cookieData)};`;

    if (data.sameSite) {
      cookie += `SameSite=${data.sameSite};`;
    }
    if (data.session) {
      cookie += ` expires=0;`;
    } else {
      const expiry = data.expiry
        ? data.expiry.toUTCString()
        : moment().add(1, 'y').toDate().toUTCString();
      cookie += ` expires=${expiry};`;
    }
    cookie += data.path ? ` path=${data.path};` : '';
    document.cookie = cookie;
  }

  public static remove(key: string): void {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  public static clear(): void {
    const cookies = Cookies.all();
    if (!!cookies) {
      Object.keys(cookies).forEach((key) => {
        Cookies.remove(key);
      });
    }
  }
}
