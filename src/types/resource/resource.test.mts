import {test, expect} from 'vitest';
import {
  fromRelatedResourceProjectionRecordValue,
  fromRelatedResourceProjectRecord,
  fromRelatedResourceRecord,
  fromRelatedResourceReferenceRecord,
  fromResourceRecord,
  isRelatedResourceInput,
  isRelatedResourceProjection,
  isRelatedResourceReference,
  isResourceInput,
  toRelatedResourceInputRecord,
  toRelatedResourceProjectionRecord,
  toRelatedResourceProjectionRecordValue,
  toRelatedResourceRecord,
  toRelatedResourceReferenceRecord,
  toResourceRecord,
} from './resource.mjs';

test('Test isRelatedResourceReference', () => {
  expect(isRelatedResourceReference({id: '1', relationType: 'contains'})).toBe(
    true,
  );
  expect(isRelatedResourceReference({})).toBe(false);
  expect(isRelatedResourceReference({id: '1'})).toBe(false);
  expect(isRelatedResourceReference({relationType: 'contains'})).toBe(false);
  expect(isRelatedResourceReference(undefined)).toBe(false);
  expect(isRelatedResourceReference(null)).toBe(false);
  expect(isRelatedResourceReference('')).toBe(false);
});

test('Test isRelatedResourceProjection', () => {
  const date = new Date().toISOString();
  expect(
    isRelatedResourceProjection({
      id: '1',
      relationType: 'contains',
      properties: [
        {
          key: 'name',
          stringValue: 'John',
        },
      ],
      relations: [
        {
          id: '2',
          relationType: 'contains',
        },
      ],
      tags: [],
      createdAt: date,
      updatedAt: date,
    }),
  ).toBe(true);
  expect(
    isRelatedResourceProjection({
      id: '1',
      relationType: 'contains',
      properties: [],
      relations: [],
      tags: [],
      createdAt: date,
      updatedAt: date,
    }),
  ).toBe(true);
  expect(
    isRelatedResourceProjection({
      id: '1',
      relationType: 'contains',
      properties: undefined,
      relations: undefined,
      createdAt: date,
      updatedAt: date,
    }),
  ).toBe(false);
  expect(isRelatedResourceProjection({})).toBe(false);
  expect(isRelatedResourceProjection(undefined)).toBe(false);
  expect(isRelatedResourceProjection(null)).toBe(false);
});

test('Test isRelatedResourceInput', () => {
  expect(isRelatedResourceInput({id: '1', relationType: 'contains'})).toBe(
    true,
  );
  expect(isRelatedResourceInput({relationType: 'contains'})).toBe(false);
  expect(isRelatedResourceInput({id: '1'})).toBe(false);
  expect(isRelatedResourceInput({})).toBe(false);
  expect(isRelatedResourceInput(undefined)).toBe(false);
  expect(isRelatedResourceInput(null)).toBe(false);
});

test('Test isResourceInput', () => {
  expect(
    isResourceInput({
      orgId: '1',
      id: '1',
      properties: [
        {
          key: 'name',
          stringValue: 'John',
        },
      ],
      tags: [],
      relations: [
        {
          id: '2',
          relationType: 'contains',
        },
      ],
    }),
  ).toBe(true);
  expect(
    isResourceInput({
      orgId: '1',
      id: '1',
      properties: [],
      tags: [],
      relations: [],
    }),
  ).toBe(true);
  expect(
    isResourceInput({
      orgId: '1',
      id: '1',
      properties: undefined,
      relations: undefined,
      tags: undefined,
    }),
  ).toBe(false);
  expect(isResourceInput({})).toBe(false);
  expect(isResourceInput(undefined)).toBe(false);
  expect(isResourceInput(null)).toBe(false);
});

test('Test toRelatedResourceReferenceRecord', () => {
  expect(
    toRelatedResourceReferenceRecord([
      {
        id: '1',
        relationType: 'contains',
        __typename: 'RelatedResourceReference',
      },
      {
        id: '2',
        relationType: 'contains',
        __typename: 'RelatedResourceReference',
      },
    ]),
  ).toEqual({
    contains: ['1', '2'],
  });
});

test('Test fromRelatedResourceReferenceRecord', () => {
  expect(
    fromRelatedResourceReferenceRecord({
      contains: ['1', '2'],
    }),
  ).toEqual([
    {id: '1', relationType: 'contains', __typename: 'RelatedResourceReference'},
    {id: '2', relationType: 'contains', __typename: 'RelatedResourceReference'},
  ]);
});

test('Test toRelatedResourceProjectionRecordValue', () => {
  const date = new Date().toISOString();
  expect(
    toRelatedResourceProjectionRecordValue({
      id: '1',
      relationType: 'contains',
      properties: [
        {
          key: 'name',
          stringValue: 'John',
          __typename: 'StringProperty',
        },
      ],
      relations: [
        {
          id: '2',
          relationType: 'contains',
          __typename: 'RelatedResourceReference',
        },
      ],
      tags: [],
      createdAt: date,
      updatedAt: date,
      __typename: 'RelatedResourceProjection',
    }),
  ).toEqual({
    id: '1',
    properties: {
      name: 'John',
    },
    relations: {
      contains: ['2'],
    },
    tags: {},
    createdAt: date,
    updatedAt: date,
  });
});

test('Test fromRelatedResourceProjectionRecordValue', () => {
  const date = new Date().toISOString();
  expect(
    fromRelatedResourceProjectionRecordValue('contains', {
      id: '1',
      properties: {
        name: 'John',
      },
      relations: {
        contains: ['2'],
      },
      tags: {},
      createdAt: date,
      updatedAt: date,
    }),
  ).toEqual({
    id: '1',
    relationType: 'contains',
    properties: [
      {
        key: 'name',
        stringValue: 'John',
        __typename: 'StringProperty',
      },
    ],
    relations: [
      {
        id: '2',
        relationType: 'contains',
        __typename: 'RelatedResourceReference',
      },
    ],
    tags: [],
    createdAt: date,
    updatedAt: date,
    __typename: 'RelatedResourceProjection',
  });
});

test('Test toRelatedResourceProjectionRecord', () => {
  const date = new Date().toISOString();
  expect(
    toRelatedResourceProjectionRecord([
      {
        id: '1',
        relationType: 'contains',
        properties: [
          {
            key: 'name',
            stringValue: 'John',
            __typename: 'StringProperty',
          },
        ],
        relations: [
          {
            id: '2',
            relationType: 'contains',
            __typename: 'RelatedResourceReference',
          },
        ],
        tags: [],
        createdAt: date,
        updatedAt: date,
        __typename: 'RelatedResourceProjection',
      },
      {
        id: '2',
        relationType: 'contains',
        properties: [
          {
            key: 'name',
            stringValue: 'Jane',
            __typename: 'StringProperty',
          },
        ],
        tags: [],
        relations: [
          {
            id: '1',
            relationType: 'contains',
            __typename: 'RelatedResourceReference',
          },
        ],
        createdAt: date,
        updatedAt: date,
        __typename: 'RelatedResourceProjection',
      },
    ]),
  ).toEqual({
    contains: [
      {
        id: '1',
        properties: {
          name: 'John',
        },
        relations: {
          contains: ['2'],
        },
        tags: {},
        createdAt: date,
        updatedAt: date,
      },
      {
        id: '2',
        properties: {
          name: 'Jane',
        },
        relations: {
          contains: ['1'],
        },
        tags: {},
        createdAt: date,
        updatedAt: date,
      },
    ],
  });
});

test('Test fromRelatedResourceProjectRecord', () => {
  const date = new Date().toISOString();
  expect(
    fromRelatedResourceProjectRecord({
      contains: [
        {
          id: '1',
          properties: {
            name: 'John',
          },
          relations: {
            contains: ['2'],
          },
          tags: {},
          createdAt: date,
          updatedAt: date,
        },
        {
          id: '2',
          properties: {
            name: 'Jane',
          },
          relations: {
            contains: ['1'],
          },
          tags: {},
          createdAt: date,
          updatedAt: date,
        },
      ],
    }),
  ).toEqual([
    {
      id: '1',
      relationType: 'contains',
      properties: [
        {
          key: 'name',
          stringValue: 'John',
          __typename: 'StringProperty',
        },
      ],
      relations: [
        {
          id: '2',
          relationType: 'contains',
          __typename: 'RelatedResourceReference',
        },
      ],
      tags: [],
      createdAt: date,
      updatedAt: date,
      __typename: 'RelatedResourceProjection',
    },
    {
      id: '2',
      relationType: 'contains',
      properties: [
        {
          key: 'name',
          stringValue: 'Jane',
          __typename: 'StringProperty',
        },
      ],
      relations: [
        {
          id: '1',
          relationType: 'contains',
          __typename: 'RelatedResourceReference',
        },
      ],
      tags: [],
      createdAt: date,
      updatedAt: date,
      __typename: 'RelatedResourceProjection',
    },
  ]);
});

test('Test toRelatedResourceRecord', () => {
  const date = new Date().toISOString();
  expect(
    toRelatedResourceRecord([
      {
        id: '1',
        relationType: 'contains',
        properties: [],
        relations: [],
        tags: [],
        createdAt: date,
        updatedAt: date,
        __typename: 'RelatedResourceProjection',
      },
      {
        id: '2',
        relationType: 'contains',
        __typename: 'RelatedResourceReference',
      },
    ]),
  ).toEqual({
    contains: [
      {
        id: '1',
        properties: {},
        relations: {},
        tags: {},
        createdAt: date,
        updatedAt: date,
      },
      '2',
    ],
  });
});

test('Test fromRelatedResourceRecord', () => {
  const date = new Date().toISOString();
  expect(
    fromRelatedResourceRecord({
      contains: [
        '1',
        '2',
        {
          id: '1',
          properties: {},
          relations: {},
          tags: {},
          createdAt: date,
          updatedAt: date,
        },
      ],
    }),
  ).toEqual([
    {
      id: '1',
      relationType: 'contains',
      __typename: 'RelatedResourceReference',
    },
    {
      id: '2',
      relationType: 'contains',
      __typename: 'RelatedResourceReference',
    },
    {
      id: '1',
      relationType: 'contains',
      properties: [],
      relations: [],
      tags: [],
      createdAt: date,
      updatedAt: date,
      __typename: 'RelatedResourceProjection',
    },
  ]);
});

test('Test toResourceRecord', () => {
  const date = new Date().toISOString();
  expect(
    toResourceRecord({
      orgId: '1',
      id: '1',
      properties: [
        {
          key: 'name',
          stringValue: 'John',
          __typename: 'StringProperty',
        },
      ],
      relations: [
        {
          id: '2',
          relationType: 'contains',
          __typename: 'RelatedResourceReference',
        },
      ],
      tags: [],
      inputHash: 'hash',
      createdAt: date,
      updatedAt: date,
    }),
  ).toEqual({
    orgId: '1',
    id: '1',
    properties: {
      name: 'John',
    },
    relations: {
      contains: ['2'],
    },
    tags: {},
    inputHash: 'hash',
    createdAt: date,
    updatedAt: date,
  });
});

test('Test fromResourceRecord', () => {
  const date = new Date().toISOString();
  expect(
    fromResourceRecord({
      orgId: '1',
      id: '1',
      properties: {
        name: 'John',
      },
      relations: {
        contains: ['2'],
      },
      tags: {},
      inputHash: 'hash',
      createdAt: date,
      updatedAt: date,
    }),
  ).toEqual({
    orgId: '1',
    id: '1',
    properties: [
      {
        key: 'name',
        stringValue: 'John',
        __typename: 'StringProperty',
      },
    ],
    relations: [
      {
        id: '2',
        relationType: 'contains',
        __typename: 'RelatedResourceReference',
      },
    ],
    tags: [],
    inputHash: 'hash',
    createdAt: date,
    updatedAt: date,
  });
});

test('Test toRelatedResourceInputRecord', () => {
  expect(
    toRelatedResourceInputRecord([
      {
        relationType: 'contains',
        id: '1',
      },
      {
        relationType: 'contains',
        id: '2',
      },
    ]),
  ).toEqual({
    contains: ['1', '2'],
  });
});
