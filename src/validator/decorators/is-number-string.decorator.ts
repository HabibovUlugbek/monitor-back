import type { ValidationOptions, ValidationArguments } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'
import { isNumberString } from '../validators'
import type { IsNumberStringOptions } from '../interfaces'

export const IsNumberString = (
  options?: IsNumberStringOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy({
    name: 'IsNumberString',
    validator: {
      validate: (value: unknown, args?: ValidationArguments): boolean => isNumberString(value, args?.constraints[0]),
      defaultMessage: buildMessage(
        (each: string): string => each + 'The value of $property has the incorrect format.',
        validationOptions,
      ),
    },
    constraints: [options],
  })
