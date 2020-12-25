import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';
import { ServiceInterface } from '../../shared/interface/ServiceInterface';

interface ReactObservableInterface<T> {
  state: T;
  observable: Observable<T>;
  next(value: T): void;
  update(value: Partial<T>): void;
}

export function useObservable<T = any>(service: ServiceInterface): ReactObservableInterface<T> {
  const instance = service.getInstance();
  const [state, setState] = useState<T>(instance.getValue());

  useEffect(() => {
    instance.observable.subscribe((data: T) => {
      setState(data);
    });
  }, []);

  const next = (value: T): void => {
    instance.update(value);
  };

  const update = (values: Partial<T>) => {
    try {
      const newState = {
        ...state,
        ...values,
      };
      next(newState);
    } catch (e) {
      console.error(e);
    }
  };

  return { state, observable: instance.observable, next, update };
}
