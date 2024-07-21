import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';

import {ResourceCategorySchema} from './resource-category.mjs';
import {ResourceServiceSchema} from './resource-service.mjs';
import {ResourceTypeSchema} from './resource-type.mjs';
import {RelationTypeSchema} from './relation-type.mjs';

export const RelatedResourceSchema = vg.type('RelatedResource', {
  id: v.string(),
  category: ResourceCategorySchema,
  service: ResourceServiceSchema,
  type: ResourceTypeSchema,
  relationType: RelationTypeSchema,
});
export type RelatedResource = v.InferOutput<typeof RelatedResourceSchema>;
