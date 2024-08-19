import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdentityAutoMappingSchema} from './identity-auto-mapping.mjs';

export const FindIdentityAutoMappingsByDomainArgsSchema = v.object({
  domain: v.string(),
});
export type FindIdentityAutoMappingsByDomainArgs = v.InferInput<
  typeof FindIdentityAutoMappingsByDomainArgsSchema
>;

export const FindIdentityAutoMappingsByDomainOutputSchema = vg.type(
  'FindIdentityAutoMappingsByDomainOutput',
  {
    mappings: v.array(IdentityAutoMappingSchema),
  },
);
export type FindIdentityAutoMappingsByDomainOutput = v.InferOutput<
  typeof FindIdentityAutoMappingsByDomainOutputSchema
>;

export const findIdentityAutoMappingsByDomain = vg.query<
  FindIdentityAutoMappingsByDomainArgs,
  FindIdentityAutoMappingsByDomainOutput
>(
  'findIdentityAutoMappingsByDomain',
  FindIdentityAutoMappingsByDomainArgsSchema,
  FindIdentityAutoMappingsByDomainOutputSchema,
);
