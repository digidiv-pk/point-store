import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '../utility';

export class RxJsService<T = any> {
  public readonly observable: Observable<T>;
  private readonly subject: BehaviorSubject<T>;

  protected constructor(defaultValue: T, private readonly key?: string) {
    let keyLockJSON: T;
    if (key) {
      keyLockJSON = Storage.exist(key as string) ? Storage.getItem(key as string) : defaultValue;
    } else {
      keyLockJSON = defaultValue;
    }
    this.subject = new BehaviorSubject<T>(keyLockJSON);
    this.observable = this.subject.asObservable();
  }

  public get value(): T {
    return this.subject.getValue();
  }

  public update(value: T): void {
    if (this.key) {
      if (value) {
        Storage.setItem(this.key, value);
      } else {
        Storage.removeItem(this.key);
      }
    }
    this.subject.next(value);
  }
}
