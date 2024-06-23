/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API.js';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getIdentity = /* GraphQL */ `query GetIdentity($id: ID!) {
  getIdentity(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetIdentityQueryVariables,
  APITypes.GetIdentityQuery
>;
export const getOrgProfile = /* GraphQL */ `query GetOrgProfile($id: ID!) {
  getOrgProfile(id: $id) {
    id
    slug
    name
    lightIcon
    darkIcon
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetOrgProfileQueryVariables,
  APITypes.GetOrgProfileQuery
>;
export const getOrg = /* GraphQL */ `query GetOrg($id: ID!) {
  getOrg(id: $id) {
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
` as GeneratedQuery<APITypes.GetOrgQueryVariables, APITypes.GetOrgQuery>;
export const findOrgBySlug =
  /* GraphQL */ `query FindOrgBySlug($slug: String!) {
  findOrgBySlug(slug: $slug) {
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
` as GeneratedQuery<
    APITypes.FindOrgBySlugQueryVariables,
    APITypes.FindOrgBySlugQuery
  >;
export const getIdentityAssignment =
  /* GraphQL */ `query GetIdentityAssignment($identityId: ID!, $orgId: ID!) {
  getIdentityAssignment(identityId: $identityId, orgId: $orgId) {
    identityId
    orgId
    roles
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetIdentityAssignmentQueryVariables,
    APITypes.GetIdentityAssignmentQuery
  >;
export const findIdentityAssignmentsByIdentity =
  /* GraphQL */ `query FindIdentityAssignmentsByIdentity($identityId: ID!) {
  findIdentityAssignmentsByIdentity(identityId: $identityId) {
    identityId
    orgId
    roles
    __typename
  }
}
` as GeneratedQuery<
    APITypes.FindIdentityAssignmentsByIdentityQueryVariables,
    APITypes.FindIdentityAssignmentsByIdentityQuery
  >;
export const findIdentityAssignmentsByOrg =
  /* GraphQL */ `query FindIdentityAssignmentsByOrg($orgId: ID!) {
  findIdentityAssignmentsByOrg(orgId: $orgId) {
    identityId
    orgId
    roles
    __typename
  }
}
` as GeneratedQuery<
    APITypes.FindIdentityAssignmentsByOrgQueryVariables,
    APITypes.FindIdentityAssignmentsByOrgQuery
  >;
export const getIdentityAutoMapping =
  /* GraphQL */ `query GetIdentityAutoMapping($orgId: ID!, $domain: String!) {
  getIdentityAutoMapping(orgId: $orgId, domain: $domain) {
    orgId
    domain
    __typename
  }
}
` as GeneratedQuery<
    APITypes.GetIdentityAutoMappingQueryVariables,
    APITypes.GetIdentityAutoMappingQuery
  >;
export const findIdentityAutoMappingsByDomain =
  /* GraphQL */ `query FindIdentityAutoMappingsByDomain($domain: String!) {
  findIdentityAutoMappingsByDomain(domain: $domain) {
    orgId
    domain
    __typename
  }
}
` as GeneratedQuery<
    APITypes.FindIdentityAutoMappingsByDomainQueryVariables,
    APITypes.FindIdentityAutoMappingsByDomainQuery
  >;
