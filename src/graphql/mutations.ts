/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API.js';
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createIdentity =
  /* GraphQL */ `mutation CreateIdentity($input: CreateIdentity!) {
  createIdentity(input: $input) {
    id
    email
    givenName
    familyName
    profilePicture
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateIdentityMutationVariables,
    APITypes.CreateIdentityMutation
  >;
export const updateIdentity =
  /* GraphQL */ `mutation UpdateIdentity($input: UpdateIdentity!) {
  updateIdentity(input: $input) {
    id
    email
    givenName
    familyName
    profilePicture
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateIdentityMutationVariables,
    APITypes.UpdateIdentityMutation
  >;
export const createOrg =
  /* GraphQL */ `mutation CreateOrg($input: CreateOrgInput!) {
  createOrg(input: $input) {
    id
    slug
    name
    lightIcon
    darkIcon
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateOrgMutationVariables,
    APITypes.CreateOrgMutation
  >;
export const updateOrg =
  /* GraphQL */ `mutation UpdateOrg($input: UpdateOrgInput!) {
  updateOrg(input: $input) {
    id
    slug
    name
    lightIcon
    darkIcon
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateOrgMutationVariables,
    APITypes.UpdateOrgMutation
  >;
