import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {OrgIdSchema} from '../org/index.mjs';
import {fromProperty, PropertyInputSchema} from '../property.mjs';
import {
  RelatedResourceInputSchema,
  toRelatedResourceInput,
} from './related-resource-input.mjs';
import {Resource} from './resource.mjs';

export const ResourceInputSchema = vg.input('CreateResourceInput', {
  orgId: OrgIdSchema,
  id: v.string(),
  properties: v.array(PropertyInputSchema),
  relations: v.array(RelatedResourceInputSchema),
});
export type ResourceInput = v.InferInput<typeof ResourceInputSchema>;

export function toResourceInput(resource: Resource): ResourceInput {
  return {
    orgId: resource.orgId,
    id: resource.id,
    properties: resource.properties.map(fromProperty),
    relations: resource.relations.map(toRelatedResourceInput),
  };
}
