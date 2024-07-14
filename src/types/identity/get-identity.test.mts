import {expect, test} from 'vitest';
import {getIdentity} from './get-identity.mjs';

test('Test getIdentity', () => {
  const query = getIdentity({id: 'test'});
  console.log(query.query);
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
      '}',
  );
});
