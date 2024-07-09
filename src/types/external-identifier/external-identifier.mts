import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {OrgIdSchema} from '../org/index.mjs';

export const ExternalIdentifierSchema = vg.type('ExternalIdentifier', {
  id: v.string(),
  orgId: OrgIdSchema,
});
export type ExternalIdentifier = v.InferOutput<typeof ExternalIdentifierSchema>;
