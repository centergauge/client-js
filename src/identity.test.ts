// eslint-disable-next-line n/no-unpublished-import
import {expect, test} from 'vitest';
import {createIdentity, getIdentity} from './identity.js';

test('Test getIdentity', () => {
  const query = getIdentity({id: 'test'});
  expect(query.variables).toEqual({id: 'test'});
  expect(query.query).toEqual(
    'query getIdentity($id: ID!) {\n' +
      '  getIdentity(id: $id) {\n' +
      '    id\n' +
      '    givenName\n' +
      '    familyName\n' +
      '    email\n' +
      '    profilePicture\n' +
      '    roles\n' +
      '    assignments {\n' +
      '      orgId\n' +
      '      roles\n' +
      '      __typename\n' +
      '    }\n' +
      '    __typename\n' +
      '  }\n' +
      '}'
  );
});

test('Test createIdentity', () => {
  const query = createIdentity({
    input: {givenName: 'test', familyName: 'test', email: 'test@example.com'},
  });
  expect(query.variables).toEqual({
    input: {givenName: 'test', familyName: 'test', email: 'test@example.com'},
  });
  expect(query.query).toEqual(
    'mutation createIdentity($input: CreateIdentityInput!) {\n' +
      '  createIdentity(input: $input) {\n' +
      '    id\n' +
      '    givenName\n' +
      '    familyName\n' +
      '    email\n' +
      '    profilePicture\n' +
      '    roles\n' +
      '    __typename\n' +
      '  }\n' +
      '}'
  );
});
