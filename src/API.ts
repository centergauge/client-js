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
};

export type UpdateOrgInput = {
  id: string;
  name?: string | null;
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
  } | null;
};

export type OrgExistsQueryVariables = {
  slug: string;
};

export type OrgExistsQuery = {
  orgExists?: boolean | null;
};
