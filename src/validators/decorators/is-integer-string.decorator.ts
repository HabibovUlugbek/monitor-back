import type { ValidationOptions, ValidationArguments } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'
import { isIntegerString } from '../validators'
import type { IsIntegerStringOptions } from '../interfaces'

export const IsIntegerString = (
  options?: IsIntegerStringOptions,
  validationOptions?: ValidationOptions,
): PropertyDecorator =>
  ValidateBy({
    name: 'IsIntegerString',
    validator: {
      validate: (value: unknown, args?: ValidationArguments): boolean => isIntegerString(value, args?.constraints[0]),
      defaultMessage: buildMessage(
        (each: string): string => each + 'The value of $property has the incorrect format.',
        validationOptions,
      ),
    },
    constraints: [options],
  })
