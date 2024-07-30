import {
  GraphQLBoolean,
  GraphQLFieldConfig,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputFieldConfig,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLInputType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLSchema,
  GraphQLString,
  ThunkObjMap,
  printSchema,
  GraphQLFieldConfigArgumentMap,
  GraphQLUnionType,
} from 'graphql';
import {
  ErrorMessage,
  ObjectEntries,
  ObjectIssue,
  ObjectSchema,
  StringIssue,
  StringSchema,
  string,
  object,
  BaseSchema,
  BaseIssue,
  OptionalSchema,
  ArraySchema,
  Default,
  ArrayIssue,
  NumberSchema,
  NumberIssue,
  UnionOptions,
  UnionIssue,
  InferIssue,
  UnionSchema,
} from 'valibot';
import * as v from 'valibot';

export function isOptionalSchema<
  TWrapped extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  TDefault extends Default<TWrapped, undefined>,
>(value: unknown): value is OptionalSchema<TWrapped, TDefault> {
  return (value as OptionalSchema<TWrapped, TDefault>).type === 'optional';
}

export function isArraySchema<
  TItem extends BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  TMessage extends ErrorMessage<ArrayIssue> | undefined,
>(value: unknown): value is ArraySchema<TItem, TMessage> {
  return (value as ArraySchema<TItem, TMessage>).type === 'array';
}

export interface IDSchema<
  TMessage extends ErrorMessage<StringIssue> | undefined,
> extends StringSchema<TMessage> {
  readonly gtype: 'ID';
}

export function isIDSchema<
  TMessage extends ErrorMessage<StringIssue> | undefined,
>(value: unknown): value is IDSchema<TMessage> {
  if (typeof value !== 'object' || value === null) return false;
  if (!('gtype' in value) || !('kind' in value) || !('type' in value))
    return false;
  const id = value as IDSchema<TMessage>;
  return id.gtype === 'ID' && id.kind === 'schema' && id.type === 'string';
}

export function id(
  message?: ErrorMessage<StringIssue>,
): IDSchema<ErrorMessage<StringIssue> | undefined> {
  return {
    ...string(message),
    gtype: 'ID',
  };
}

export interface FloatSchema<
  TMessage extends ErrorMessage<NumberIssue> | undefined,
> extends NumberSchema<TMessage> {
  readonly gtype: 'Float';
}

export function isFloatSchema<
  TMessage extends ErrorMessage<NumberIssue> | undefined,
>(value: unknown): value is FloatSchema<TMessage> {
  if (typeof value !== 'object' || value === null) return false;
  if (!('gtype' in value) || !('kind' in value) || !('type' in value))
    return false;
  const float = value as FloatSchema<TMessage>;
  return (
    float.gtype === 'Float' &&
    float.kind === 'schema' &&
    float.type === 'number'
  );
}

export function float(
  message?: ErrorMessage<NumberIssue>,
): FloatSchema<ErrorMessage<NumberIssue> | undefined> {
  return {
    ...v.number(message),
    gtype: 'Float',
  };
}

export interface TypeSchema<
  TEntries extends ObjectEntries,
  TMessage extends ErrorMessage<ObjectIssue> | undefined,
> extends ObjectSchema<TEntries, TMessage> {
  readonly gtype: 'Type';
  readonly name: string;
}

export function type<TEntries extends ObjectEntries>(
  name: string,
  entries: TEntries,
): TypeSchema<TEntries, undefined> {
  return {
    ...object(entries),
    gtype: 'Type',
    name,
  };
}

export function isTypeSchema<
  TEntries extends ObjectEntries,
  TMessage extends ErrorMessage<ObjectIssue> | undefined,
>(value: unknown): value is TypeSchema<TEntries, TMessage> {
  if (typeof value !== 'object' || value === null) return false;
  if (!('gtype' in value) || !('kind' in value) || !('type' in value))
    return false;
  const type = value as TypeSchema<TEntries, TMessage>;
  return (
    type.gtype === 'Type' && type.kind === 'schema' && type.type === 'object'
  );
}

export interface InputSchema<
  TEntries extends ObjectEntries,
  TMessage extends ErrorMessage<ObjectIssue> | undefined,
> extends ObjectSchema<TEntries, TMessage> {
  readonly gtype: 'Input';
  readonly name: string;
}

export function input<TEntries extends ObjectEntries>(
  name: string,
  entries: TEntries,
): InputSchema<TEntries, undefined> {
  return {
    ...object(entries),
    gtype: 'Input',
    name,
  };
}

export function isInputSchema<
  TEntries extends ObjectEntries,
  TMessage extends ErrorMessage<ObjectIssue> | undefined,
>(value: unknown): value is InputSchema<TEntries, TMessage> {
  if (typeof value !== 'object' || value === null) return false;
  if (!('gtype' in value) || !('kind' in value) || !('type' in value))
    return false;
  const input = value as InputSchema<TEntries, TMessage>;
  return (
    input.gtype === 'Input' &&
    input.kind === 'schema' &&
    input.type === 'object'
  );
}

export interface UnionTypeSchema<
  TOptions extends UnionOptions,
  TMessage extends
    | ErrorMessage<UnionIssue<InferIssue<TOptions[number]>>>
    | undefined,
> extends UnionSchema<TOptions, TMessage> {
  readonly gtype: 'Union';
  readonly name: string;
}

export function union<TOptions extends UnionOptions>(
  name: string,
  options: TOptions,
): UnionTypeSchema<TOptions, undefined> {
  return {
    ...v.union(options),
    gtype: 'Union',
    name,
  };
}

export function isUnionTypeSchema<
  TOptions extends UnionOptions,
  TMessage extends
    | ErrorMessage<UnionIssue<InferIssue<TOptions[number]>>>
    | undefined,
>(value: unknown): value is UnionTypeSchema<TOptions, TMessage> {
  if (typeof value !== 'object' || value === null) return false;
  if (!('gtype' in value) || !('kind' in value) || !('type' in value))
    return false;
  const union = value as UnionTypeSchema<TOptions, TMessage>;
  return (
    union.gtype === 'Union' && union.kind === 'schema' && union.type === 'union'
  );
}

interface Registry {
  types: {
    [key: string]: GraphQLObjectType;
  };
  unions: {
    [key: string]: GraphQLUnionType;
  };
  inputs: {
    [key: string]: GraphQLInputObjectType;
  };
}

function toScalarType(
  schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
):
  | typeof GraphQLID
  | typeof GraphQLString
  | typeof GraphQLFloat
  | typeof GraphQLInt
  | typeof GraphQLBoolean {
  switch (schema.type) {
    case 'string':
      if (isIDSchema(schema)) {
        return GraphQLID;
      }
      return GraphQLString;
    case 'literal':
      return GraphQLString;
    case 'boolean':
      return GraphQLBoolean;
    case 'number':
      return isFloatSchema(schema) ? GraphQLFloat : GraphQLInt;
    case 'picklist':
      return GraphQLString;
    default:
      throw new Error(`Unsupported schema type ${schema.type}`);
  }
}

function toType(
  registry: Registry,
  schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  optional = false,
): GraphQLOutputType {
  let type: GraphQLOutputType | undefined = undefined;
  switch (schema.type) {
    case 'object':
      if (isTypeSchema(schema)) {
        type = registry.types[schema.name];
        type = type ? type : toGraphQLObjectType(registry, schema);
      } else if (isUnionTypeSchema(schema)) {
        type = registry.unions[schema.name];
        type = type ? type : toGraphQLUnionType(registry, schema);
      } else if (isInputSchema(schema)) {
        throw new Error(
          `${schema.name} is an input and not allowed in output types in GraphQL`,
        );
      } else {
        throw new Error(
          'Object is not an input or type. Nested objects not supported.',
        );
      }
      break;
    case 'optional':
      optional = true;
      type = toType(
        registry,
        (schema as OptionalSchema<never, never>).wrapped,
        optional,
      );
      break;
    case 'array':
      type = new GraphQLList(
        toType(registry, (schema as ArraySchema<never, never>).item),
      );
      break;
    case 'union':
      if (isUnionTypeSchema(schema)) {
        type = registry.unions[schema.name];
      } else {
        throw new Error('Object is not a union type.');
      }
      break;
    default:
      type = toScalarType(schema);
  }
  if (type === undefined) {
    throw new Error(
      `Unable to find registry entry for a type of ${schema.type}`,
    );
  }
  return optional ? type : new GraphQLNonNull(type);
}

export function toGraphQLObjectType<
  TEntries extends ObjectEntries,
  TMessage extends ErrorMessage<ObjectIssue> | undefined,
>(
  registry: Registry,
  schema: TypeSchema<TEntries, TMessage>,
): GraphQLObjectType {
  if (registry.types[schema.name]) {
    return registry.types[schema.name];
  }
  if (isTypeSchema<ObjectEntries, undefined>(schema)) {
    const typeSchema = schema as TypeSchema<ObjectEntries, undefined>;
    const name = typeSchema.name;
    const fields: ThunkObjMap<GraphQLFieldConfig<unknown, unknown>> = {};
    for (const entryKey in typeSchema.entries) {
      if (entryKey !== '__typename') {
        fields[entryKey] = {
          type: toType(registry, typeSchema.entries[entryKey]),
        };
      }
    }
    const type = new GraphQLObjectType({
      name,
      fields,
    });
    registry.types[name] = type;
    return type;
  }
  throw new Error(`Schema in union is not a graphql type`);
}

export function toGraphQLUnionType<
  TOptions extends UnionOptions,
  TMessage extends
    | ErrorMessage<UnionIssue<InferIssue<TOptions[number]>>>
    | undefined,
>(
  registry: Registry,
  schema: UnionTypeSchema<TOptions, TMessage>,
): GraphQLUnionType {
  if (registry.unions[schema.name]) {
    return registry.unions[schema.name];
  }
  if (isUnionTypeSchema<TOptions, TMessage>(schema)) {
    const unionSchema = schema as UnionTypeSchema<TOptions, TMessage>;
    const name = unionSchema.name;
    const union = new GraphQLUnionType({
      name,
      types: unionSchema.options.map((option) => {
        if (isTypeSchema(option)) {
          let type = registry.types[option.name];
          if (!type) {
            type = toGraphQLObjectType(registry, option);
          }
          return type;
        }
        throw new Error('Union must contain graphql types');
      }),
    });
    registry.unions[name] = union;
    return union;
  }
  throw new Error('Not a graphql union');
}

function toInput(
  registry: Registry,
  schema: BaseSchema<unknown, unknown, BaseIssue<unknown>>,
  optional = false,
): GraphQLInputType {
  let type: GraphQLInputType | undefined = undefined;
  switch (schema.type) {
    case 'object':
      if (isInputSchema(schema)) {
        type = registry.inputs[schema.name];
        type = type ? type : toGraphQLInputObjectType(registry, schema);
      } else if (isTypeSchema(schema)) {
        throw new Error(
          `${schema.name} is a type and not allowed in an input in GraphQL`,
        );
      } else {
        throw new Error(
          'Object is not an input or type. Nested objects not supported.',
        );
      }
      break;
    case 'optional':
      optional = true;
      type = toInput(
        registry,
        (schema as OptionalSchema<never, never>).wrapped,
        optional,
      );
      break;
    case 'array':
      type = new GraphQLList(
        toInput(registry, (schema as ArraySchema<never, never>).item, optional),
      );
      break;
    default:
      type = toScalarType(schema);
  }
  return optional ? type : new GraphQLNonNull(type);
}

export function toGraphQLInputObjectType<
  TEntries extends ObjectEntries,
  TMessage extends ErrorMessage<ObjectIssue> | undefined,
>(
  registry: Registry,
  schema: InputSchema<TEntries, TMessage>,
): GraphQLInputObjectType {
  if (registry.inputs[schema.name]) {
    return registry.inputs[schema.name];
  }
  if (isInputSchema<ObjectEntries, undefined>(schema)) {
    const inputSchema = schema as InputSchema<ObjectEntries, undefined>;
    const name = inputSchema.name;
    const fields: ThunkObjMap<GraphQLInputFieldConfig> = {};
    for (const entryKey in inputSchema.entries) {
      fields[entryKey] = {
        type: toInput(registry, inputSchema.entries[entryKey]),
      };
    }
    const type = new GraphQLInputObjectType({
      name,
      fields,
    });
    registry.inputs[name] = type;
    return type;
  }
  throw new Error('Not a graphql input');
}

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
function toGraphQLParamsString(schema: ObjectSchema<any, any>): string {
  let str = '';
  for (const entryKey in schema.entries) {
    let entry = schema.entries[entryKey];
    let optional = false;
    if (isOptionalSchema(entry)) {
      entry = entry.wrapped;
      optional = true;
    }
    if (isArraySchema(entry)) {
      entry = entry.item;
    }
    switch (entry.type) {
      case 'string':
      case 'picklist':
        if (isIDSchema(entry)) {
          str += `$${entryKey}: ID${optional ? '' : '!'}, `;
        } else {
          str += `$${entryKey}: String${optional ? '' : '!'}, `;
        }
        break;
      case 'boolean':
        str += `$${entryKey}: Boolean${optional ? '' : '!'}, `;
        break;
      case 'object':
        if (isInputSchema(entry)) {
          const input = toGraphQLInputObjectType(
            {types: {}, unions: {}, inputs: {}},
            entry,
          );
          str += `$${entryKey}: ${input.name}${optional ? '' : '!'}, `;
        } else if (isTypeSchema(entry)) {
          throw new Error(
            `${entry.name} is an type and not allowed in input parameter in a GraphQL query`,
          );
        } else {
          throw new Error(
            'Object is not an input. Nested objects not supported.',
          );
        }
        break;
      default:
        throw new Error(`Unsupported schema type ${entry.type}`);
    }
    // str += `$${entryKey}: ${toTypeString(schema.entries[entryKey])}, `;
  }
  str = str.slice(0, -2); // Remove the trailing comma and space
  return str;
}

function toGraphQLBlockString(
  indent: string,
  schema: // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  | ObjectSchema<any, any>
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    | OptionalSchema<ObjectSchema<any, any>, any>
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    | ArraySchema<ObjectSchema<any, any>, any>,
): string {
  if (isOptionalSchema(schema)) {
    return toGraphQLBlockString(indent, schema.wrapped);
  } else {
    let str = '{';
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    for (const key in (schema as ObjectSchema<any, any>).entries) {
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      const entry = (schema as ObjectSchema<any, any>).entries[key];
      if (isArraySchema(entry) && isUnionTypeSchema(entry.item)) {
        str += `\n${indent}  ${key} {`;
        for (const option of entry.item.options) {
          if (isTypeSchema(option)) {
            str +=
              `\n${indent}    ... on ${option.name} ` +
              toGraphQLBlockString(indent + '    ', option);
          } else {
            throw new Error('Schema in union is not a type');
          }
        }
        str += `\n${indent}  }`;
      } else {
        const rootEntry = isArraySchema(entry)
          ? entry.item
          : isOptionalSchema(entry)
            ? entry.wrapped
            : entry;
        str += `\n${indent}  ${key}`;
        if (rootEntry.type === 'object') {
          str += ' ' + toGraphQLBlockString(indent + '  ', rootEntry);
        }
      }
    }
    str += `\n${indent}}`;
    return str;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Query<I, O> = {
  name: string;
  variables: I;
  query: string;
};

export interface QueryFn<I, O> {
  (args: I): Query<I, O>;
  metadata: {
    name: string;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    args: ObjectSchema<any, any>;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    output: // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    | TypeSchema<any, any>
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      | OptionalSchema<TypeSchema<any, any>, any>
      // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      | ArraySchema<TypeSchema<any, any>, any>;
  };
}

export function query<I, O>(
  name: string,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  argsSchema: ObjectSchema<any, any>,
  outputSchema: // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  | TypeSchema<any, any>
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    | OptionalSchema<TypeSchema<any, any>, any>
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    | ArraySchema<TypeSchema<any, any>, any>,
): QueryFn<I, O> {
  const fn = function (variables: I): Query<I, O> {
    let query =
      `query ${name}(` + toGraphQLParamsString(argsSchema) + `) {\n  ${name}(`;
    for (const key of Object.keys(argsSchema.entries)) {
      query += `${key}: $${key}, `;
    }
    query = query.slice(0, -2); // Remove the trailing comma and space
    query += ') ' + toGraphQLBlockString('  ', outputSchema) + '\n}';
    return {
      name,
      variables,
      query,
    };
  };
  (fn as QueryFn<I, O>).metadata = {
    name,
    args: argsSchema,
    output: outputSchema,
  };
  return fn as QueryFn<I, O>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Mutation<I, O> = {
  name: string;
  variables: I | {input: I};
  query: string;
};

export interface MutationFn<I, O> {
  (args: I): Query<I, O>;
  metadata: {
    name: string;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    args: ObjectSchema<any, any>;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    output: TypeSchema<any, any>;
  };
}

export function mutation<I, O>(
  name: string,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  argsSchema: ObjectSchema<any, any>,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  outputSchema: TypeSchema<any, any>,
): MutationFn<I, O> {
  const fn = function (variables: I): Mutation<I, O> {
    let query =
      `mutation ${name}(` +
      toGraphQLParamsString(
        isInputSchema(argsSchema) ? v.object({input: argsSchema}) : argsSchema,
      ) +
      `) {\n  ${name}(`;
    if (isInputSchema(argsSchema)) {
      query += 'input: $input, ';
    } else {
      for (const key of Object.keys(argsSchema.entries)) {
        query += `${key}: $${key}, `;
      }
    }
    query = query.slice(0, -2); // Remove the trailing comma and space
    query += ') ' + toGraphQLBlockString('  ', outputSchema) + '\n}';
    return {
      name,
      variables: isInputSchema(argsSchema) ? {input: variables} : variables,
      query,
    };
  };
  (fn as MutationFn<I, O>).metadata = {
    name,
    args: argsSchema,
    output: outputSchema,
  };
  return fn as MutationFn<I, O>;
}

function toGraphQLQueryField(
  registry: Registry,
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  fn: QueryFn<any, any>,
): ThunkObjMap<GraphQLFieldConfig<unknown, unknown>> {
  const args: GraphQLFieldConfigArgumentMap = {};
  for (const key in fn.metadata.args.entries) {
    args[key] = {type: toInput(registry, fn.metadata.args.entries[key])};
  }
  const fields: ThunkObjMap<GraphQLFieldConfig<unknown, unknown>> = {};
  const outputSchema = isOptionalSchema(fn.metadata.output)
    ? // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      (fn.metadata.output.wrapped as TypeSchema<any, any>)
    : // eslint-disable-next-line  @typescript-eslint/no-explicit-any
      (fn.metadata.output as TypeSchema<any, any>);
  fields[fn.metadata.name] = {
    type: isOptionalSchema(fn.metadata.output)
      ? registry.types[outputSchema.name]
      : new GraphQLNonNull(registry.types[outputSchema.name]),
    args,
  };
  return fields;
}

export function toGraphQLSchema({
  types,
  inputs,
  unions,
  queries,
  mutations,
}: {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  types: TypeSchema<any, any>[];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  inputs: InputSchema<any, any>[];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  unions: UnionTypeSchema<any, any>[];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  queries: QueryFn<any, any>[];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  mutations: MutationFn<any, any>[];
}): GraphQLSchema {
  const registry: Registry = {
    types: {},
    inputs: {},
    unions: {},
  };
  const gUnions = unions.map((union) => toGraphQLUnionType(registry, union));
  const gTypes = types.map((type) => toGraphQLObjectType(registry, type));
  const gInputs = inputs.map((input) =>
    toGraphQLInputObjectType(registry, input),
  );
  const queryFields = queries
    .map((query) => toGraphQLQueryField(registry, query))
    .reduce((acc, fields) => ({...acc, ...fields}), {});
  const mutationFields = mutations
    .map((mutationFn) => {
      if (isInputSchema(mutationFn.metadata.args)) {
        return toGraphQLQueryField(
          registry,
          mutation(
            mutationFn.metadata.name,
            v.object({input: mutationFn.metadata.args}),
            mutationFn.metadata.output,
          ),
        );
      } else {
        return toGraphQLQueryField(registry, mutationFn);
      }
    })
    .reduce((acc, fields) => ({...acc, ...fields}), {});
  return new GraphQLSchema({
    types: [...gTypes, ...gInputs, ...gUnions],
    query:
      queries.length > 0
        ? new GraphQLObjectType({
            name: 'Query',
            fields: queryFields,
          })
        : undefined,
    mutation:
      mutations.length > 0
        ? new GraphQLObjectType({
            name: 'Mutation',
            fields: mutationFields,
          })
        : undefined,
  });
}

export function toGraphQLSchemaString({
  types,
  inputs,
  unions,
  queries,
  mutations,
}: {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  types: TypeSchema<any, any>[];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  inputs: InputSchema<any, any>[];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  unions: UnionTypeSchema<any, any>[];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  queries: QueryFn<any, any>[];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  mutations: MutationFn<any, any>[];
}): string {
  return printSchema(
    toGraphQLSchema({types, inputs, unions, queries, mutations}),
  );
}
