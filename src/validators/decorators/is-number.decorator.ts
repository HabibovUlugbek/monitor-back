import type { ValidationOptions, ValidationArguments } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'
import { isNumber } from '../validators'
import type { IsNumberOptions } from '../interfaces'

export const IsNumber = (options?: IsNumberOptions, validationOptions?: ValidationOptions): PropertyDecorator =>
  ValidateBy({
    name: 'IsNumber',
    validator: {
      validate: (value: unknown, args?: ValidationArguments): boolean => isNumber(value, args?.constraints[0]),
      defaultMessage: buildMessage(
        (each: string): string => each + 'The value of $property has the incorrect format.',
        validationOptions,
      ),
    },
    constraints: [options],
  })
