import * as v from 'valibot';

export const RelationTypeSchema = v.picklist([
  'contains',
  'containedIn',
  'uses',
  'usedBy',
  'relatesTo',
]);
export type RelationType = v.InferOutput<typeof RelationTypeSchema>;
