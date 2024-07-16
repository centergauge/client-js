import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {
  CategorySchema,
  RelatedResourceInputSchema,
  Resource,
  ResourceSchema,
  ResourceTypeSchema,
  ServiceSchema,
} from './resource.mjs';
import {OrgIdSchema} from '../org/index.mjs';
import {PropertyInputSchema} from '../common.mjs';

export const CreateResourceInputSchema = vg.input('CreateResourceInput', {
  orgId: OrgIdSchema,
  id: v.string(),
  category: CategorySchema,
  service: ServiceSchema,
  type: ResourceTypeSchema,
  properties: v.array(PropertyInputSchema),
  relations: v.array(RelatedResourceInputSchema),
});
export type CreateResourceInput = v.InferInput<
  typeof CreateResourceInputSchema
>;

export const createResource = vg.mutation<CreateResourceInput, Resource>(
  'createResource',
  CreateResourceInputSchema,
  ResourceSchema,
);
