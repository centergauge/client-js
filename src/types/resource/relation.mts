import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {RelatedResourceSchema} from './resource.mjs';

export const RelationTypeSchema = v.picklist([
  'dependsOn',
  'usedBy',
  'partOf',
  'contains',
  'relatesTo',
]);
export type RelationType = v.InferOutput<typeof RelationTypeSchema>;

export const RelationSchema = vg.type('Relation', {
  type: RelationTypeSchema,
  resource: RelatedResourceSchema,
  generated: v.boolean(),
  createdBy: v.optional(v.string()),
  createdAt: v.string(),
});
export type Relation = v.InferOutput<typeof RelationSchema>;

export const RelationInputSchema = vg.input('RelationInput', {
  type: RelationTypeSchema,
  resourceId: v.string(),
});
export type RelationInput = v.InferOutput<typeof RelationInputSchema>;
