import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {ResourceCategorySchema} from './resource-category.mjs';
import {ResourceServiceSchema} from './resource-sercice.mjs';
import {ResourceTypeSchema} from './resource-type.mjs';

export const RelatedResourceInputSchema = vg.input('RelatedResourceInput', {
  id: v.string(),
  category: ResourceCategorySchema,
  service: ResourceServiceSchema,
  type: ResourceTypeSchema,
});
export type RelatedResourceInput = v.InferInput<
  typeof RelatedResourceInputSchema
>;
