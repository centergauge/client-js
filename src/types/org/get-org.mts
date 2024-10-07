import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {OrgSchema} from './org.mjs';
import {IdSchema} from '../id.mjs';
import {PartnerConnectionSchema} from '../partner-connection/index.mjs';

export const GetOrgArgsSchema = v.object({id: IdSchema});
export type GetOrgArgs = v.InferInput<typeof GetOrgArgsSchema>;

export const GetOrgOutputSchema = vg.type('GetOrgOutput', {
  ...OrgSchema.entries,
  identityAutoMappings: v.array(v.string()),
  partnerConnections: v.array(PartnerConnectionSchema),
});
export type GetOrgOutput = v.InferOutput<typeof GetOrgOutputSchema>;

export const getOrg = vg.query<GetOrgArgs, GetOrgOutput>(
  'getOrg',
  GetOrgArgsSchema,
  v.optional(GetOrgOutputSchema),
);
