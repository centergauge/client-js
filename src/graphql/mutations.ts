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
    roles
    assignments {
      identityId
      orgId
      roles
      __typename
    }
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
    roles
    assignments {
      identityId
      orgId
      roles
      __typename
    }
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
    publicSignInEnabled
    publicSupportEnabled
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
    publicSignInEnabled
    publicSupportEnabled
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateOrgMutationVariables,
    APITypes.UpdateOrgMutation
  >;
export const createIdentityAssignment =
  /* GraphQL */ `mutation CreateIdentityAssignment($input: CreateIdentityAssignmentInput!) {
  createIdentityAssignment(input: $input) {
    identityId
    orgId
    roles
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateIdentityAssignmentMutationVariables,
    APITypes.CreateIdentityAssignmentMutation
  >;
export const updateIdentityAssignment =
  /* GraphQL */ `mutation UpdateIdentityAssignment($input: UpdateIdentityAssignmentInput!) {
  updateIdentityAssignment(input: $input) {
    identityId
    orgId
    roles
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateIdentityAssignmentMutationVariables,
    APITypes.UpdateIdentityAssignmentMutation
  >;
export const createIdentityAutoMapping =
  /* GraphQL */ `mutation CreateIdentityAutoMapping($input: CreateIdentityAutoMappingInput!) {
  createIdentityAutoMapping(input: $input) {
    orgId
    domain
    __typename
  }
}
` as GeneratedMutation<
    APITypes.CreateIdentityAutoMappingMutationVariables,
    APITypes.CreateIdentityAutoMappingMutation
  >;
export const updateIdentityAutoMapping =
  /* GraphQL */ `mutation UpdateIdentityAutoMapping($input: UpdateIdentityAutoMappingInput!) {
  updateIdentityAutoMapping(input: $input) {
    orgId
    domain
    __typename
  }
}
` as GeneratedMutation<
    APITypes.UpdateIdentityAutoMappingMutationVariables,
    APITypes.UpdateIdentityAutoMappingMutation
  >;
export const deleteIdentityAutoMapping =
  /* GraphQL */ `mutation DeleteIdentityAutoMapping($input: DeleteIdentityAutoMappingInput!) {
  deleteIdentityAutoMapping(input: $input) {
    orgId
    domain
    __typename
  }
}
` as GeneratedMutation<
    APITypes.DeleteIdentityAutoMappingMutationVariables,
    APITypes.DeleteIdentityAutoMappingMutation
  >;
