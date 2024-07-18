import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {PropertySchema} from '../common.mjs';
import {OrgIdSchema} from '../org/index.mjs';
import {RelatedResourceSchema} from './related-resource.mjs';
import {ResourceCategorySchema} from './resource-category.mjs';
import {ResourceServiceSchema} from './resource-sercice.mjs';
import {ResourceTypeSchema} from './resource-type.mjs';

export const ResourceSchema = vg.type('Resource', {
  orgId: OrgIdSchema,
  id: v.string(),
  category: ResourceCategorySchema,
  service: ResourceServiceSchema,
  type: ResourceTypeSchema,
  properties: v.array(PropertySchema),
  relations: v.array(RelatedResourceSchema),
  generated: v.boolean(),
  createdBy: v.optional(v.string()),
  createdAt: v.string(),
  updatedAt: v.string(),
});
export type Resource = v.InferOutput<typeof ResourceSchema>;
