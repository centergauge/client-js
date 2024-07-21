import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {RelationType, RelationTypeSchema} from './relation-type.mjs';
import {RelatedResource} from './related-resource.mjs';

export const RelatedResourceInputSchema = vg.input('RelatedResourceInput', {
  relationType: RelationTypeSchema,
  id: v.string(),
});
export type RelatedResourceInput = v.InferInput<
  typeof RelatedResourceInputSchema
>;

export function toRelatedResourceInput(relatedResource: RelatedResource) {
  return {
    relationType: relatedResource.relationType,
    id: relatedResource.id,
  };
}

export function relatedResourceInputsToRecord(
  relations: RelatedResourceInput[],
): Partial<Record<RelationType, string[]>> {
  const record: Partial<Record<RelationType, string[]>> = {};
  relations.forEach((relation) => {
    let array = record[relation.relationType];
    if (!array) {
      array = [];
      record[relation.relationType] = array;
    }
    array.push(relation.id);
  });
  return record;
}
