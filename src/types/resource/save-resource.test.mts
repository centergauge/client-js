import {test, expect} from 'vitest';
import {saveResource} from './save-resource.mjs';

test('Test saveResource', () => {
  const mutation = saveResource({
    id: 'test',
    orgId: 'test',
    properties: [],
    relations: [],
  });
  console.log(mutation.query);
  expect(mutation.query).toEqual(
    'mutation saveResource($input: ResourceInput!) {\n' +
      '  saveResource(input: $input) {\n' +
      '    orgId\n' +
      '    id\n' +
      '    properties {\n' +
      '      ... on StringProperty {\n' +
      '        key\n' +
      '        stringValue\n' +
      '        __typename\n' +
      '      }\n' +
      '      ... on BooleanProperty {\n' +
      '        key\n' +
      '        booleanValue\n' +
      '        __typename\n' +
      '      }\n' +
      '      ... on IntegerProperty {\n' +
      '        key\n' +
      '        integerValue\n' +
      '        __typename\n' +
      '      }\n' +
      '      ... on FloatProperty {\n' +
      '        key\n' +
      '        floatValue\n' +
      '        __typename\n' +
      '      }\n' +
      '      ... on StringArrayProperty {\n' +
      '        key\n' +
      '        stringValues\n' +
      '        __typename\n' +
      '      }\n' +
      '    }\n' +
      '    relations {\n' +
      '      ... on RelatedResourceProjection {\n' +
      '        id\n' +
      '        relationType\n' +
      '        properties {\n' +
      '          ... on StringProperty {\n' +
      '            key\n' +
      '            stringValue\n' +
      '            __typename\n' +
      '          }\n' +
      '          ... on BooleanProperty {\n' +
      '            key\n' +
      '            booleanValue\n' +
      '            __typename\n' +
      '          }\n' +
      '          ... on IntegerProperty {\n' +
      '            key\n' +
      '            integerValue\n' +
      '            __typename\n' +
      '          }\n' +
      '          ... on FloatProperty {\n' +
      '            key\n' +
      '            floatValue\n' +
      '            __typename\n' +
      '          }\n' +
      '          ... on StringArrayProperty {\n' +
      '            key\n' +
      '            stringValues\n' +
      '            __typename\n' +
      '          }\n' +
      '        }\n' +
      '        relations {\n' +
      '          relationType\n' +
      '          id\n' +
      '          __typename\n' +
      '        }\n' +
      '        createdAt\n' +
      '        updatedAt\n' +
      '        __typename\n' +
      '      }\n' +
      '      ... on RelatedResourceReference {\n' +
      '        relationType\n' +
      '        id\n' +
      '        __typename\n' +
      '      }\n' +
      '    }\n' +
      '    createdAt\n' +
      '    updatedAt\n' +
      '    inputHash\n' +
      '  }\n' +
      '}',
  );
  console.log(mutation.query);
});
