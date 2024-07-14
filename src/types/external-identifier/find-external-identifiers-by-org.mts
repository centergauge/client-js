import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {ExternalIdentifierSchema} from './external-identifier.mjs';

export const FindExternalIdentifiersByOrgArgsSchema = v.object({
  orgId: v.string(),
});
export type FindExternalIdentifiersByOrgArgs = v.InferInput<
  typeof FindExternalIdentifiersByOrgArgsSchema
>;

export const FindExternalIdentifiersByOrgOutputSchema = vg.type(
  'FindExternalIdentifiersByOrgOutput',
  {
    externalIdentifiers: v.array(ExternalIdentifierSchema),
  },
);
export type FindExternalIdentifiersByOrgOutput = v.InferOutput<
  typeof FindExternalIdentifiersByOrgOutputSchema
>;

export const findExternalIdentifiersByOrg = vg.query<
  FindExternalIdentifiersByOrgArgs,
  FindExternalIdentifiersByOrgOutput
>(
  'findExternalIdentifiersByOrg',
  FindExternalIdentifiersByOrgArgsSchema,
  FindExternalIdentifiersByOrgOutputSchema,
);
