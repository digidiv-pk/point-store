import { classToPlain, plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError, ValidatorOptions } from 'class-validator';

import 'reflect-metadata';

// interface ValidationErrors {
//   errors: Record<string, string[]>;
//   children?: ValidationErrors;
// }

class Validator {
  static validatorOptions: ValidatorOptions = {
    whitelist: true,
  };

  static async validate(
    validatorClass: any,
    validatorObject: object,
    validatorOptions?: ValidatorOptions,
  ): Promise<any> {
    const classObject: any = plainToClass(validatorClass, validatorObject);
    try {
      await validateOrReject(classObject, validatorOptions || Validator.validatorOptions);
      return classToPlain(classObject);
    } catch (e) {
      throw Validator.exceptionFactory(e);
    }
  }

  static exceptionFactory(errors: ValidationError[]): any {
    const errorsException: any = {};
    for (const error of errors) {
      if (error.constraints) {
        errorsException[error.property] = Object.values(error.constraints);
      } else if (error.children.length) {
        errorsException[error.property] = Validator.exceptionFactory(error.children);
      }
    }
    return errorsException;
  }
}

export default Validator;
