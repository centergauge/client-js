import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {OrgIdSchema} from '../org/index.mjs';
import {PropertyInputSchema} from '../common.mjs';
import {RelatedResourceInputSchema} from './related-resource-input.mjs';
import {ResourceCategorySchema} from './resource-category.mjs';
import {ResourceServiceSchema} from './resource-sercice.mjs';
import {ResourceTypeSchema} from './resource-type.mjs';

export const ResourceInputSchema = vg.input('CreateResourceInput', {
  orgId: OrgIdSchema,
  id: v.string(),
  category: ResourceCategorySchema,
  service: ResourceServiceSchema,
  type: ResourceTypeSchema,
  properties: v.array(PropertyInputSchema),
  relations: v.array(RelatedResourceInputSchema),
});
export type ResourceInput = v.InferInput<typeof ResourceInputSchema>;
