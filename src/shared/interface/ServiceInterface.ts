import { Observable } from 'rxjs';
export interface ServiceInstanceInterface<T = any> {
  observable: Observable<T>;
  getValue(): T;
  update(value: T): T;
}

export interface ServiceInterface<T = any> {
  getInstance(): ServiceInstanceInterface<T>;
}
