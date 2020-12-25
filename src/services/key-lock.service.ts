import { AxiosPromise } from 'axios';
import { BehaviorSubject, Observable } from 'rxjs';
import { KeyLockInterface } from 'shared/interface';
import { API, Storage } from '../utility';

export class KeyLockService {
  private constructor() {
    const keyLockJSON = Storage.exist('keyLock') ? Storage.getItem('keyLock') : [];
    this.subject = new BehaviorSubject<KeyLockInterface[]>(keyLockJSON);
    this.observable = this.subject.asObservable();
    this.getList();
  }
  private static instance: KeyLockService;
  public readonly observable: Observable<KeyLockInterface[]>;
  private readonly subject: BehaviorSubject<KeyLockInterface[]>;

  public static getInstance(): KeyLockService {
    if (!KeyLockService.instance) {
      KeyLockService.instance = new KeyLockService();
    }
    return KeyLockService.instance;
  }

  public getValue(): KeyLockInterface[] {
    return this.subject.getValue();
  }

  public update(keyLocks: KeyLockInterface[]): void {
    if (keyLocks) {
      Storage.setItem('keyLock', keyLocks);
    } else {
      Storage.removeItem('keyLock');
    }
    this.subject.next(keyLocks);
  }

  public getList(): AxiosPromise<KeyLockInterface[]> {
    return API.Auth.keyLockList().then((response) => {
      this.update(response.data);
      return response;
    });
  }
}
