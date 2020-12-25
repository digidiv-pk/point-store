export class Storage {
  static getItem(key: string): any {
    if (this.exist(key)) {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } else {
      return {};
    }
  }

  static setItem(key: string, value: any): void {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
  }

  static exist(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}
