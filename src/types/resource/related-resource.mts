import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';

import {ResourceCategorySchema} from './resource-category.mjs';
import {ResourceServiceSchema} from './resource-sercice.mjs';
import {ResourceTypeSchema} from './resource-type.mjs';

export const RelatedResourceSchema = vg.type('RelatedResource', {
  id: v.string(),
  category: ResourceCategorySchema,
  service: ResourceServiceSchema,
  type: ResourceTypeSchema,
  generated: v.boolean(),
  createdBy: v.optional(v.string()),
  createdAt: v.string(),
});
export type RelatedResource = v.InferOutput<typeof RelatedResourceSchema>;
