import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {OrgIdSchema, OrgSchema} from './org.mjs';

export const GetOrgArgsSchema = v.object({id: OrgIdSchema});
export type GetOrgArgs = v.InferInput<typeof GetOrgArgsSchema>;

export const GetOrgOutputSchema = vg.type('GetOrgOutput', {
  ...OrgSchema.entries,
  identityAutoMappings: v.array(v.string()),
});
export type GetOrgOutput = v.InferOutput<typeof GetOrgOutputSchema>;

export const getOrg = vg.query<GetOrgArgs, GetOrgOutput>(
  'getOrg',
  GetOrgArgsSchema,
  v.optional(GetOrgOutputSchema),
);
