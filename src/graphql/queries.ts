/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from '../API.js';
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getIdentity = /* GraphQL */ `query GetIdentity($id: String!) {
  getIdentity(id: $id) {
    id
    email
    givenName
    familyName
    profilePicture
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetIdentityQueryVariables,
  APITypes.GetIdentityQuery
>;
export const orgExists = /* GraphQL */ `query OrgExists($slug: String!) {
  orgExists(slug: $slug)
}
` as GeneratedQuery<APITypes.OrgExistsQueryVariables, APITypes.OrgExistsQuery>;
