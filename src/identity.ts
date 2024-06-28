import {z} from 'zod';
import {
  graphQLEnum,
  graphQLID,
  graphQLInput,
  graphQLMutation,
  graphQLQuery,
  graphQLType,
} from './zod-to-graphql.js';
import {OrgId} from './org.js';

export const IdentityId = graphQLID(z.string()).uuid();

export const OrgRole = graphQLEnum(
  z.enum(['OWNER', 'ADMIN', 'MEMBER']),
  'OrgRole'
);

export const OrgAssignment = graphQLType(
  z.object({
    orgId: OrgId,
    roles: z.array(OrgRole),
  }),
  'OrgAssignment'
);
export type OrgAssignment = z.infer<typeof OrgAssignment>;

export const Identity = graphQLType(
  z.object({
    id: IdentityId,
    givenName: z.string().max(60),
    familyName: z.string().max(60),
    email: z.string().email(),
    profilePicture: z.string().url().optional(),
    roles: z.array(z.string()).optional(),
  }),
  'Identity'
);
export type Identity = z.infer<typeof Identity>;

export const IdentityOrgAssignment = graphQLType(
  OrgAssignment.extend({
    identityId: IdentityId,
  }),
  'IdentityOrgAssignment'
);
export type IdentityOrgAssignment = z.infer<typeof IdentityOrgAssignment>;

///////////////////////////////////////////////////////////////////////////////
// getIdentity()
///////////////////////////////////////////////////////////////////////////////
export const GetIdentityOutput = graphQLType(
  Identity.extend({
    assignments: z.array(OrgAssignment).optional(),
  }),
  'GetIdentityOutput'
);
export type GetIdentityOutput = z.infer<typeof GetIdentityOutput>;

export const GetIdentityQueryVariables = z.object({
  id: IdentityId,
});
export type GetIdentityQueryVariables = z.infer<
  typeof GetIdentityQueryVariables
>;

export const getIdentity = graphQLQuery<
  GetIdentityQueryVariables,
  GetIdentityOutput
>('getIdentity', GetIdentityQueryVariables, GetIdentityOutput.optional());

///////////////////////////////////////////////////////////////////////////////
// createIdentity()
///////////////////////////////////////////////////////////////////////////////
export const CreateIdentityInput = graphQLInput(
  Identity.extend({}),
  'CreateIdentityInput'
);
export type CreateIdentityInput = z.infer<typeof CreateIdentityInput>;

export const CreateIdentityOutput = graphQLType(
  Identity,
  'CreateIdentityOutput'
);
export type CreateIdentityOutput = z.infer<typeof CreateIdentityOutput>;

export const CreateIdentityMutationVariables = z.object({
  input: CreateIdentityInput,
});
export type CreateIdentityMutationVariables = z.infer<
  typeof CreateIdentityMutationVariables
>;

export const createIdentity = graphQLMutation(
  'createIdentity',
  CreateIdentityMutationVariables,
  CreateIdentityOutput
);
