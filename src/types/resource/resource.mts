import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {PropertySchema} from '../property.mjs';
import {OrgIdSchema} from '../org/index.mjs';
import {RelatedResourceSchema} from './related-resource.mjs';
import {ResourceCategorySchema} from './resource-category.mjs';
import {ResourceServiceSchema} from './resource-service.mjs';
import {ResourceTypeSchema} from './resource-type.mjs';

export const ResourceSchema = vg.type('Resource', {
  orgId: OrgIdSchema,
  id: v.string(),
  category: ResourceCategorySchema,
  service: ResourceServiceSchema,
  type: ResourceTypeSchema,
  properties: v.array(PropertySchema),
  relations: v.array(RelatedResourceSchema),
  createdAt: v.string(),
  updatedAt: v.string(),
  inputHash: v.string(),
});
export type Resource = v.InferOutput<typeof ResourceSchema>;
