import type { ValidationOptions, ValidationArguments } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'
import { isInteger } from '../validators'
import type { IsIntegerOptions } from '../interfaces'

export const IsInteger = (options?: IsIntegerOptions, validationOptions?: ValidationOptions): PropertyDecorator =>
  ValidateBy({
    name: 'IsInteger',
    validator: {
      validate: (value: unknown, args?: ValidationArguments): boolean => isInteger(value, args?.constraints[0]),
      defaultMessage: buildMessage(
        (each: string): string => each + 'The value of $property has the incorrect format.',
        validationOptions,
      ),
    },
    constraints: [options],
  })
