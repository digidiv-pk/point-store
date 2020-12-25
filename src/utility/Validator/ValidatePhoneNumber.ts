import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isPhoneNumber,
} from 'class-validator';

@ValidatorConstraint({ name: 'ValidatePhoneNumber', async: false })
export class ValidatePhoneNumber implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments): boolean {
    return isPhoneNumber(text, 'IL') || isPhoneNumber(text, 'PK');
  }

  defaultMessage(args: ValidationArguments): string {
    // here you can provide default error message if validation failed
    return '$value must be a valid Phone Number';
  }
}
