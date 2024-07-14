import * as v from 'valibot';
import * as vg from './valibot-to-graphql.mjs';

export const StringPropertySchema = vg.type('StringProperty', {
  key: v.string(),
  value: v.string(),
});
export type StringProperty = v.InferOutput<typeof StringPropertySchema>;

export const BooleanPropertySchema = vg.type('BooleanProperty', {
  key: v.string(),
  value: v.boolean(),
});
export type BooleanProperty = v.InferOutput<typeof BooleanPropertySchema>;

export const IntegerPropertySchema = vg.type('IntegerProperty', {
  key: v.string(),
  value: v.number(), // TODO In the future move to v.integer()
});
export type IntegerProperty = v.InferOutput<typeof IntegerPropertySchema>;

export const FloatPropertySchema = vg.type('FloatProperty', {
  key: v.string(),
  value: vg.float(),
});
export type FloatProperty = v.InferOutput<typeof FloatPropertySchema>;

export const PropertySchema = vg.union('Property', [
  StringPropertySchema,
  BooleanPropertySchema,
  IntegerPropertySchema,
  FloatPropertySchema,
]);
export type Property = v.InferOutput<typeof PropertySchema>;
