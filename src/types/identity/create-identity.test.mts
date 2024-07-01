// eslint-disable-next-line n/no-unpublished-import
import {expect, test} from 'vitest';
import {
  createIdentity,
  CreateIdentityInput,
  CreateIdentityInputSchema,
} from './create-identity.mjs';
import * as v from 'valibot';

test('Test createIdentity', () => {
  const query = createIdentity({
    id: 'test',
    givenName: 'test',
    familyName: 'test',
    email: 'test@example.com',
  });
  expect(query.variables).toEqual({
    id: 'test',
    givenName: 'test',
    familyName: 'test',
    email: 'test@example.com',
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

test('Test Validation', () => {
  const input: CreateIdentityInput = {
    id: 'not a uuid',
    givenName: 'test',
    familyName: 'test',
    email: 'not an email',
  };
  const parseResult = v.safeParse(CreateIdentityInputSchema, input);
  expect(parseResult.success).toBe(false);
});
