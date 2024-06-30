// eslint-disable-next-line n/no-unpublished-import
import {expect, test} from 'vitest';
import * as vg from './valibot-to-graphql.js';
import * as v from 'valibot';

test('Test isIDSchema', () => {
  expect(vg.isIDSchema(vg.id())).toBe(true);
  expect(vg.isIDSchema(v.string())).toBe(false);
  expect(vg.isIDSchema(undefined)).toBe(false);
  expect(vg.isIDSchema(null)).toBe(false);
  expect(vg.isIDSchema('something')).toBe(false);
});

test('Test isTypeSchema', () => {
  expect(vg.isTypeSchema(vg.type('Something', {}))).toBe(true);
  expect(vg.isTypeSchema(v.object({}))).toBe(false);
  expect(vg.isTypeSchema(vg.input('Something', {}))).toBe(false);
  expect(vg.isTypeSchema(undefined)).toBe(false);
  expect(vg.isTypeSchema(null)).toBe(false);
  expect(vg.isTypeSchema('something')).toBe(false);
});

test('Test isInputSchema', () => {
  expect(vg.isInputSchema(vg.input('Something', {}))).toBe(true);
  expect(vg.isInputSchema(v.string())).toBe(false);
  expect(vg.isInputSchema(v.object({}))).toBe(false);
  expect(vg.isInputSchema(vg.type('Something', {}))).toBe(false);
  expect(vg.isInputSchema(undefined)).toBe(false);
  expect(vg.isInputSchema(null)).toBe(false);
  expect(vg.isInputSchema('something')).toBe(false);
});

test('Test toGraphQLSchema', () => {
  const TestTypeSchema = vg.type('TestType', {
    id: vg.id(),
    foo: v.string(),
    monkey: v.optional(v.string()),
  });

  const TestComplexTypeSchema = vg.type('TestComplexType', {
    id: vg.id(),
    foo: v.string(),
    monkey: v.optional(v.string()),
    bar: v.array(v.string()),
    baz: v.optional(v.array(v.string())),
    bin: v.optional(v.array(v.optional(v.string()))),
    meow: v.optional(TestTypeSchema),
    bark: TestTypeSchema,
  });
  const TestInputSchema = vg.input('TestInput', {
    id: vg.id(),
    foo: v.string(),
    monkey: v.optional(v.string()),
  });
  const TestComplexInputSchema = vg.input('TestComplexInputType', {
    id: vg.id(),
    foo: v.string(),
    monkey: v.optional(v.string()),
    bar: v.array(v.string()),
    baz: v.optional(v.array(v.string())),
    bin: v.optional(v.array(v.optional(v.string()))),
    meow: v.optional(TestInputSchema),
    bark: TestInputSchema,
  });

  const schemaString = vg.toGraphQLSchemaString({
    types: [TestTypeSchema, TestComplexTypeSchema],
    inputs: [TestInputSchema, TestComplexInputSchema],
    queries: [],
    mutations: [],
  });
  console.log(schemaString);
  expect(schemaString).toEqual(
    'type TestType {\n' +
      '  id: ID!\n' +
      '  foo: String!\n' +
      '  monkey: String\n' +
      '}\n' +
      '\n' +
      'type TestComplexType {\n' +
      '  id: ID!\n' +
      '  foo: String!\n' +
      '  monkey: String\n' +
      '  bar: [String!]!\n' +
      '  baz: [String!]\n' +
      '  bin: [String]\n' +
      '  meow: TestType\n' +
      '  bark: TestType!\n' +
      '}\n' +
      '\n' +
      'input TestInput {\n' +
      '  id: ID!\n' +
      '  foo: String!\n' +
      '  monkey: String\n' +
      '}\n' +
      '\n' +
      'input TestComplexInputType {\n' +
      '  id: ID!\n' +
      '  foo: String!\n' +
      '  monkey: String\n' +
      '  bar: [String!]!\n' +
      '  baz: [String]\n' +
      '  bin: [String]\n' +
      '  meow: TestInput\n' +
      '  bark: TestInput!\n' +
      '}'
  );
});

test('Test nested object on Type', () => {
  const NestedTypeSchema = vg.type('TestComplexType', {
    id: vg.id(),
    foo: v.string(),
    monkey: v.optional(v.string()),
    bar: v.array(v.string()),
    baz: v.object({
      id: vg.id(),
      foo: v.string(),
      monkey: v.optional(v.string()),
    }),
  });

  expect(() =>
    vg.toGraphQLSchemaString({
      types: [NestedTypeSchema],
      inputs: [],
      queries: [],
      mutations: [],
    })
  ).toThrow();
});

test('Test nested on Input', () => {
  const NestedInputSchema = vg.input('TestInput', {
    id: vg.id(),
    foo: v.string(),
    monkey: v.optional(v.string()),
    bar: v.array(v.string()),
    baz: v.object({
      id: vg.id(),
      foo: v.string(),
      monkey: v.optional(v.string()),
    }),
  });

  expect(() =>
    vg.toGraphQLSchemaString({
      types: [],
      inputs: [NestedInputSchema],
      queries: [],
      mutations: [],
    })
  ).toThrow();
});
