import type { ValidationOptions, ValidationArguments } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'
import { isDate } from '../validators'
import type { IsDateOptions } from '../interfaces'

export const IsDate = (options?: IsDateOptions, validationOptions?: ValidationOptions): PropertyDecorator =>
  ValidateBy({
    name: 'IsDate',
    validator: {
      validate: (value: unknown, args?: ValidationArguments): boolean => isDate(value, args?.constraints[0]),
      defaultMessage: buildMessage(
        (each: string): string => each + 'The value of $property has the incorrect format.',
        validationOptions,
      ),
    },
    constraints: [options],
  })
