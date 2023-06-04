import type { ValidationOptions } from 'class-validator'
import { ValidateBy, buildMessage } from 'class-validator'
import { isPhone } from '@validators'

export const IsPhone = (validationOptions?: ValidationOptions): PropertyDecorator =>
  ValidateBy({
    name: 'IsPhone',
    validator: {
      validate: (value: unknown): boolean => isPhone(value),
      defaultMessage: buildMessage(
        (each: string): string => each + 'The value of $property has the incorrect format.',
        validationOptions,
      ),
    },
  })
