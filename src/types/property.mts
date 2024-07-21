import * as v from 'valibot';
import * as vg from './valibot-to-graphql.mjs';

export function isInteger(num: unknown): num is number {
  if (!num || typeof num !== 'number') {
    return false;
  }
  return num % 1 === 0;
}

export const StringPropertySchema = vg.type('StringProperty', {
  key: v.string(),
  stringValue: v.string(),
  __typename: v.literal('StringProperty'),
});
export type StringProperty = v.InferOutput<typeof StringPropertySchema>;

export function isStringProperty(
  property: unknown,
): property is StringProperty {
  return (
    (property as StringProperty).key !== undefined &&
    typeof (property as StringProperty).stringValue === 'string'
  );
}

export const StringArrayPropertySchema = vg.type('StringArrayProperty', {
  key: v.string(),
  stringValues: v.array(v.string()),
  __typename: v.literal('StringArrayProperty'),
});
export type StringArrayProperty = v.InferOutput<
  typeof StringArrayPropertySchema
>;

export function isStringArrayProperty(
  property: unknown,
): property is StringArrayProperty {
  return (
    (property as StringArrayProperty).key !== undefined &&
    Array.isArray((property as StringArrayProperty).stringValues) &&
    (property as StringArrayProperty).stringValues.every(
      (value: unknown) => typeof value === 'string',
    )
  );
}

export const BooleanPropertySchema = vg.type('BooleanProperty', {
  key: v.string(),
  booleanValue: v.boolean(),
  __typename: v.literal('BooleanProperty'),
});
export type BooleanProperty = v.InferOutput<typeof BooleanPropertySchema>;

export function isBooleanProperty(
  property: unknown,
): property is BooleanProperty {
  return (
    (property as BooleanProperty).key !== undefined &&
    typeof (property as BooleanProperty).booleanValue === 'boolean'
  );
}

export const IntegerPropertySchema = vg.type('IntegerProperty', {
  key: v.string(),
  integerValue: v.number(), // TODO In the future move to v.integer()
  __typename: v.literal('IntegerProperty'),
});
export type IntegerProperty = v.InferOutput<typeof IntegerPropertySchema>;

export function isIntegerProperty(
  property: unknown,
): property is IntegerProperty {
  return (
    (property as IntegerProperty).key !== undefined &&
    typeof (property as IntegerProperty).integerValue === 'number' &&
    isInteger((property as IntegerProperty).integerValue)
  );
}

export const FloatPropertySchema = vg.type('FloatProperty', {
  key: v.string(),
  floatValue: vg.float(),
  __typename: v.literal('FloatProperty'),
});
export type FloatProperty = v.InferOutput<typeof FloatPropertySchema>;

export function isFloat(num: unknown): num is number {
  return typeof num === 'number' && !isInteger(num);
}

export function isFloatProperty(property: unknown): property is FloatProperty {
  return (
    (property as FloatProperty).key !== undefined &&
    typeof (property as FloatProperty).floatValue === 'number' &&
    isFloat((property as FloatProperty).floatValue)
  );
}

export const PropertySchema = vg.union('Property', [
  StringPropertySchema,
  BooleanPropertySchema,
  IntegerPropertySchema,
  FloatPropertySchema,
  StringArrayPropertySchema,
]);
export type Property = v.InferOutput<typeof PropertySchema>;

export const PropertyTypeSchema = v.picklist([
  'string',
  'string[]',
  'boolean',
  'integer',
  'float',
]);
export type PropertyType = v.InferOutput<typeof PropertyInputSchema>;

export const PropertyInputSchema = vg.input('PropertyInput', {
  key: v.string(),
  value: v.string(),
  type: PropertyTypeSchema,
});
export type PropertyInput = v.InferInput<typeof PropertyInputSchema>;

export function toProperty(property: PropertyInput): Property {
  switch (property.type) {
    case 'boolean':
      return {
        key: property.key,
        booleanValue: property.value.toLowerCase() === 'true',
        __typename: 'BooleanProperty',
      };
    case 'integer':
      return {
        key: property.key,
        integerValue: parseInt(property.value),
        __typename: 'IntegerProperty',
      };
    case 'float':
      return {
        key: property.key,
        floatValue: parseFloat(property.value),
        __typename: 'FloatProperty',
      };
    case 'string[]':
      return {
        key: property.key,
        stringValues: property.value.split(','),
        __typename: 'StringArrayProperty',
      };
    default:
      return {
        key: property.key,
        stringValue: property.value,
        __typename: 'StringProperty',
      };
  }
}

export function fromProperty(property: Property): PropertyInput {
  if (isBooleanProperty(property)) {
    return {
      key: property.key,
      value: property.booleanValue.toString(),
      type: 'boolean',
    };
  }
  if (isIntegerProperty(property)) {
    return {
      key: property.key,
      value: property.integerValue.toString(),
      type: 'integer',
    };
  }
  if (isFloatProperty(property)) {
    return {
      key: property.key,
      value: (property.floatValue as number).toString(),
      type: 'float',
    };
  }
  if (isStringArrayProperty(property)) {
    return {
      key: property.key,
      value: (property.stringValues as string[]).join(','),
      type: 'string[]',
    };
  }
  return {
    key: property.key,
    value: property.stringValue,
    type: 'string',
  };
}

export function propertyInputsToRecord(
  properties: PropertyInput[],
): Record<string, string | number | boolean | string[]> {
  const record: Record<string, string | number | boolean | string[]> = {};
  for (const property of properties) {
    switch (property.type) {
      case 'string[]':
        record[property.key] = property.value.split(',');
        break;
      case 'boolean':
        record[property.key] = property.value.toLowerCase() === 'true';
        break;
      case 'integer':
        record[property.key] = parseInt(property.value);
        break;
      case 'float':
        record[property.key] = parseFloat(property.value);
        break;
      default:
        record[property.key] = property.value;
        break;
    }
  }
  return record;
}

export function recordToProperties(
  map: Record<string, string | number | boolean | string[]>,
): Property[] {
  const properties: Property[] = [];
  for (const [key, value] of Object.entries(map)) {
    if (Array.isArray(value)) {
      properties.push({
        key,
        stringValues: value,
        __typename: 'StringArrayProperty',
      });
    } else if (typeof value === 'boolean') {
      properties.push({
        key,
        booleanValue: value,
        __typename: 'BooleanProperty',
      });
    } else if (isInteger(value)) {
      properties.push({
        key,
        integerValue: value,
        __typename: 'IntegerProperty',
      });
    } else if (isFloat(value)) {
      properties.push({
        key,
        floatValue: value,
        __typename: 'FloatProperty',
      });
    } else {
      properties.push({
        key,
        stringValue: value,
        __typename: 'StringProperty',
      });
    }
  }
  return properties;
}
