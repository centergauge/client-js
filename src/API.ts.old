/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateIdentity = {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  profilePicture?: string | null;
};

export type Identity = {
  __typename: 'Identity';
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  profilePicture?: string | null;
  roles?: Array<string> | null;
  assignments?: Array<IdentityAssignment> | null;
};

export type IdentityAssignment = {
  __typename: 'IdentityAssignment';
  identityId: string;
  orgId: string;
  roles?: Array<string> | null;
};

export type UpdateIdentity = {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  profilePicture?: string | null;
};

export type CreateOrgInput = {
  slug: string;
  name: string;
};

export type Org = {
  __typename: 'Org';
  id: string;
  slug: string;
  name: string;
  lightIcon?: string | null;
  darkIcon?: string | null;
  publicSignInEnabled?: boolean | null;
  publicSupportEnabled?: boolean | null;
};

export type UpdateOrgInput = {
  id: string;
  name?: string | null;
  lightIcon?: string | null;
  darkIcon?: string | null;
};

export type CreateIdentityAssignmentInput = {
  identityId: string;
  orgId: string;
  roles: Array<string>;
};

export type UpdateIdentityAssignmentInput = {
  identityId: string;
  orgId: string;
  roles: Array<string>;
};

export type CreateIdentityAutoMappingInput = {
  orgId: string;
  domain: string;
};

export type IdentityAutoMapping = {
  __typename: 'IdentityAutoMapping';
  orgId: string;
  domain: string;
};

export type UpdateIdentityAutoMappingInput = {
  orgId: string;
  domain: string;
};

export type DeleteIdentityAutoMappingInput = {
  orgId: string;
  domain: string;
};

export type OrgProfile = {
  __typename: 'OrgProfile';
  id: string;
  slug: string;
  name: string;
  lightIcon?: string | null;
  darkIcon?: string | null;
};

export type CreateIdentityMutationVariables = {
  input: CreateIdentity;
};

export type CreateIdentityMutation = {
  createIdentity?: {
    __typename: 'Identity';
    id: string;
    email: string;
    givenName: string;
    familyName: string;
    profilePicture?: string | null;
    roles?: Array<string> | null;
    assignments?: Array<{
      __typename: 'IdentityAssignment';
      identityId: string;
      orgId: string;
      roles?: Array<string> | null;
    }> | null;
  } | null;
};

export type UpdateIdentityMutationVariables = {
  input: UpdateIdentity;
};

export type UpdateIdentityMutation = {
  updateIdentity?: {
    __typename: 'Identity';
    id: string;
    email: string;
    givenName: string;
    familyName: string;
    profilePicture?: string | null;
    roles?: Array<string> | null;
    assignments?: Array<{
      __typename: 'IdentityAssignment';
      identityId: string;
      orgId: string;
      roles?: Array<string> | null;
    }> | null;
  } | null;
};

export type CreateOrgMutationVariables = {
  input: CreateOrgInput;
};

export type CreateOrgMutation = {
  createOrg?: {
    __typename: 'Org';
    id: string;
    slug: string;
    name: string;
    lightIcon?: string | null;
    darkIcon?: string | null;
    publicSignInEnabled?: boolean | null;
    publicSupportEnabled?: boolean | null;
  } | null;
};

export type UpdateOrgMutationVariables = {
  input: UpdateOrgInput;
};

export type UpdateOrgMutation = {
  updateOrg?: {
    __typename: 'Org';
    id: string;
    slug: string;
    name: string;
    lightIcon?: string | null;
    darkIcon?: string | null;
    publicSignInEnabled?: boolean | null;
    publicSupportEnabled?: boolean | null;
  } | null;
};

export type CreateIdentityAssignmentMutationVariables = {
  input: CreateIdentityAssignmentInput;
};

export type CreateIdentityAssignmentMutation = {
  createIdentityAssignment?: {
    __typename: 'IdentityAssignment';
    identityId: string;
    orgId: string;
    roles?: Array<string> | null;
  } | null;
};

export type UpdateIdentityAssignmentMutationVariables = {
  input: UpdateIdentityAssignmentInput;
};

export type UpdateIdentityAssignmentMutation = {
  updateIdentityAssignment?: {
    __typename: 'IdentityAssignment';
    identityId: string;
    orgId: string;
    roles?: Array<string> | null;
  } | null;
};

export type CreateIdentityAutoMappingMutationVariables = {
  input: CreateIdentityAutoMappingInput;
};

export type CreateIdentityAutoMappingMutation = {
  createIdentityAutoMapping?: {
    __typename: 'IdentityAutoMapping';
    orgId: string;
    domain: string;
  } | null;
};

export type UpdateIdentityAutoMappingMutationVariables = {
  input: UpdateIdentityAutoMappingInput;
};

export type UpdateIdentityAutoMappingMutation = {
  updateIdentityAutoMapping?: {
    __typename: 'IdentityAutoMapping';
    orgId: string;
    domain: string;
  } | null;
};

export type DeleteIdentityAutoMappingMutationVariables = {
  input: DeleteIdentityAutoMappingInput;
};

export type DeleteIdentityAutoMappingMutation = {
  deleteIdentityAutoMapping?: {
    __typename: 'IdentityAutoMapping';
    orgId: string;
    domain: string;
  } | null;
};

export type GetIdentityQueryVariables = {
  id: string;
};

export type GetIdentityQuery = {
  getIdentity?: {
    __typename: 'Identity';
    id: string;
    email: string;
    givenName: string;
    familyName: string;
    profilePicture?: string | null;
    roles?: Array<string> | null;
    assignments?: Array<{
      __typename: 'IdentityAssignment';
      identityId: string;
      orgId: string;
      roles?: Array<string> | null;
    }> | null;
  } | null;
};

export type GetOrgProfileQueryVariables = {
  id: string;
};

export type GetOrgProfileQuery = {
  getOrgProfile?: {
    __typename: 'OrgProfile';
    id: string;
    slug: string;
    name: string;
    lightIcon?: string | null;
    darkIcon?: string | null;
  } | null;
};

export type GetOrgQueryVariables = {
  id: string;
};

export type GetOrgQuery = {
  getOrg?: {
    __typename: 'Org';
    id: string;
    slug: string;
    name: string;
    lightIcon?: string | null;
    darkIcon?: string | null;
    publicSignInEnabled?: boolean | null;
    publicSupportEnabled?: boolean | null;
  } | null;
};

export type FindOrgBySlugQueryVariables = {
  slug: string;
};

export type FindOrgBySlugQuery = {
  findOrgBySlug?: {
    __typename: 'Org';
    id: string;
    slug: string;
    name: string;
    lightIcon?: string | null;
    darkIcon?: string | null;
    publicSignInEnabled?: boolean | null;
    publicSupportEnabled?: boolean | null;
  } | null;
};

export type GetIdentityAssignmentQueryVariables = {
  identityId: string;
  orgId: string;
};

export type GetIdentityAssignmentQuery = {
  getIdentityAssignment?: {
    __typename: 'IdentityAssignment';
    identityId: string;
    orgId: string;
    roles?: Array<string> | null;
  } | null;
};

export type FindIdentityAssignmentsByIdentityQueryVariables = {
  identityId: string;
};

export type FindIdentityAssignmentsByIdentityQuery = {
  findIdentityAssignmentsByIdentity?: Array<{
    __typename: 'IdentityAssignment';
    identityId: string;
    orgId: string;
    roles?: Array<string> | null;
  }> | null;
};

export type FindIdentityAssignmentsByOrgQueryVariables = {
  orgId: string;
};

export type FindIdentityAssignmentsByOrgQuery = {
  findIdentityAssignmentsByOrg?: Array<{
    __typename: 'IdentityAssignment';
    identityId: string;
    orgId: string;
    roles?: Array<string> | null;
  }> | null;
};

export type GetIdentityAutoMappingQueryVariables = {
  orgId: string;
  domain: string;
};

export type GetIdentityAutoMappingQuery = {
  getIdentityAutoMapping?: {
    __typename: 'IdentityAutoMapping';
    orgId: string;
    domain: string;
  } | null;
};

export type FindIdentityAutoMappingsByDomainQueryVariables = {
  domain: string;
};

export type FindIdentityAutoMappingsByDomainQuery = {
  findIdentityAutoMappingsByDomain?: Array<{
    __typename: 'IdentityAutoMapping';
    orgId: string;
    domain: string;
  }> | null;
};
