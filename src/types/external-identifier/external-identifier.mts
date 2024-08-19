import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';

export const ExternalIdentifierSchema = vg.type('ExternalIdentifier', {
  id: v.string(),
  orgId: IdSchema,
});
export type ExternalIdentifier = v.InferOutput<typeof ExternalIdentifierSchema>;
