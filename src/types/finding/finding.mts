import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';

export const FindingSchema = vg.type('Finding', {
  id: v.string(),
  // TODO Populate additional fields
});
export type Finding = v.InferOutput<typeof FindingSchema>;

export const FindingInputSchema = vg.input('FindingInput', {
  id: v.string(),
  // TODO Populate remaining
});
export type FindingInput = v.InferOutput<typeof FindingInputSchema>;
