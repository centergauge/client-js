import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {PropertySchema} from '../common.mjs';
import {OrgIdSchema} from '../org/index.mjs';

export const CategorySchema = v.picklist(['aws']);
export type Category = v.InferOutput<typeof CategorySchema>;

export const ServiceSchema = v.picklist(['cloudwatch']);
export type Service = v.InferOutput<typeof ServiceSchema>;

export const ResourceTypeSchema = v.picklist(['Account', 'Alarm']);
export type ResourceType = v.InferOutput<typeof ResourceTypeSchema>;

export const RelatedResourceSchema = vg.type('RelatedResource', {
  id: v.string(),
  category: CategorySchema,
  service: ServiceSchema,
  type: ResourceTypeSchema,
});
export type RelatedResource = v.InferOutput<typeof RelatedResourceSchema>;

export const RelatedResourceInputSchema = vg.input('RelatedResourceInput', {
  id: v.string(),
  category: CategorySchema,
  service: ServiceSchema,
  type: ResourceTypeSchema,
});
export type RelatedResourceInput = v.InferInput<
  typeof RelatedResourceInputSchema
>;

export const ResourceSchema = vg.type('Resource', {
  orgId: OrgIdSchema,
  id: v.string(),
  category: CategorySchema,
  service: ServiceSchema,
  type: ResourceTypeSchema,
  properties: v.array(PropertySchema),
  relations: v.array(RelatedResourceSchema),
});
export type Resource = v.InferOutput<typeof ResourceSchema>;
