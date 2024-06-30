import {
  ThunkObjMap,
  GraphQLID,
  GraphQLNonNull,
  GraphQLOutputType,
  GraphQLFieldConfig,
  GraphQLInputFieldConfig,
  GraphQLSchema,
  GraphQLObjectType,
  printSchema,
  GraphQLString,
  GraphQLList,
  GraphQLEnumType,
  GraphQLInputType,
  GraphQLInputObjectType,
  GraphQLNamedType,
  GraphQLEnumValueConfig,
  GraphQLFieldConfigArgumentMap,
} from 'graphql';
import {
  z,
  ZodArray,
  ZodEffects,
  ZodObject,
  ZodRawShape,
  ZodTypeAny,
  ZodString,
  ZodOptional,
  ZodEnum,
  ZodTypeDef,
} from 'zod';

export interface GraphQLZodTypeDef extends ZodTypeDef {
  isGraphQLID?: boolean;
  graphQLName?: string;
  graphQLType?: 'type' | 'input' | 'enum' | 'query' | 'mutation';
  graphQLOutputSchema?: ZodTypeAny;
}

interface RegistryEntry {
  schema: ZodObject<ZodRawShape> | ZodEnum<[string, ...string[]]>;
  type: 'type' | 'input' | 'enum' | 'query' | 'mutation';
  graphQLType?:
    | GraphQLObjectType
    | GraphQLEnumType
    | GraphQLInputType
    | ThunkObjMap<GraphQLFieldConfig<unknown, unknown>>;
}

type Registry = Map<string, RegistryEntry>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type GraphQLQuery<I, O> = {
  name: string;
  variables: I;
  query: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type GraphQLMutation<I, O> = {
  name: string;
  variables: I;
  query: string;
};

export function graphQLID(schema: ZodString) {
  (schema._def as GraphQLZodTypeDef).isGraphQLID = true;
  return schema;
}

export function graphQLType<T extends ZodRawShape>(
  shape: ZodObject<T>,
  name: string
) {
  (shape._def as GraphQLZodTypeDef).graphQLName = name;
  (shape._def as GraphQLZodTypeDef).graphQLType = 'type';
  return shape;
}

export function graphQLInput<T extends ZodRawShape>(
  shape: ZodObject<T>,
  name: string
) {
  (shape._def as GraphQLZodTypeDef).graphQLName = name;
  (shape._def as GraphQLZodTypeDef).graphQLType = 'input';
  return shape;
}

export function graphQLEnum<T extends [string, ...string[]]>(
  schema: ZodEnum<T>,
  name: string
) {
  (schema._def as GraphQLZodTypeDef).graphQLName = name;
  (schema._def as GraphQLZodTypeDef).graphQLType = 'enum';
  return schema;
}

function getRootZodObject<T extends ZodRawShape>(
  type: ZodTypeAny
): ZodObject<T> | undefined {
  if (type instanceof ZodObject) {
    return type;
  } else if (type instanceof ZodEffects) {
    return getRootZodObject(type._def.schema);
  } else if (type instanceof ZodOptional) {
    return getRootZodObject(type._def.innerType);
  } else if (type instanceof ZodArray) {
    return getRootZodObject(type.element);
  }
  return undefined;
}

function toGraphQLBlockString(indent: string, schema: ZodTypeAny): string {
  const root = getRootZodObject(schema);
  if (root === undefined) {
    throw new Error('Root ZodObject not found');
  }
  let queryStr = '{';
  for (const [key, value] of Object.entries(root.shape)) {
    queryStr += `\n${indent}  ${key}`;
    const valueRoot = getRootZodObject(value as ZodTypeAny);
    if (valueRoot instanceof ZodObject) {
      queryStr +=
        ' ' + toGraphQLBlockString(indent + '  ', value as ZodTypeAny);
    }
  }
  queryStr += `\n${indent}  __typename`;
  queryStr += `\n${indent}}`;
  return queryStr;
}

function toGraphQLParamsString<T extends ZodRawShape>(
  schema: ZodObject<T>
): string {
  let queryStr = '';
  for (const [key, value] of Object.entries(schema.shape)) {
    if (value instanceof ZodString) {
      if ((value._def as GraphQLZodTypeDef).isGraphQLID) {
        queryStr += `$${key}: ID!, `;
      } else {
        queryStr += `$${key}: String!, `;
      }
    } else {
      const valueRoot = getRootZodObject(value as ZodTypeAny);
      if (valueRoot instanceof ZodObject) {
        queryStr += `$${key}: ${getGraphQLName(valueRoot)}!, `;
      } else {
        throw new Error('Unsupported mutation variable type');
      }
    }
  }
  queryStr = queryStr.slice(0, -2); // Remove the trailing comma and space
  return queryStr;
}

export function graphQLQuery<I, O>(
  name: string,
  queryVariablesSchema: ZodObject<ZodRawShape>,
  outputSchema: ZodTypeAny
) {
  (queryVariablesSchema._def as GraphQLZodTypeDef).graphQLName = name;
  (queryVariablesSchema._def as GraphQLZodTypeDef).graphQLType = 'query';
  (queryVariablesSchema._def as GraphQLZodTypeDef).graphQLOutputSchema =
    outputSchema;
  return function (variables: I): GraphQLQuery<I, O> {
    let queryStr =
      `query ${name}(` +
      toGraphQLParamsString(queryVariablesSchema) +
      `) {\n  ${name}(`;
    for (const key of Object.keys(queryVariablesSchema.shape)) {
      queryStr += `${key}: $${key}, `;
    }
    queryStr = queryStr.slice(0, -2); // Remove the trailing comma and space
    queryStr += ') ' + toGraphQLBlockString('  ', outputSchema) + '\n}';
    return {
      name,
      variables,
      query: queryStr,
    };
  };
}

export function graphQLMutation<I, O, T extends ZodRawShape>(
  name: string,
  mutationVariablesSchema: ZodObject<T>,
  outputSchema: ZodTypeAny
) {
  (mutationVariablesSchema._def as GraphQLZodTypeDef).graphQLName = name;
  (mutationVariablesSchema._def as GraphQLZodTypeDef).graphQLType = 'mutation';
  (mutationVariablesSchema._def as GraphQLZodTypeDef).graphQLOutputSchema =
    outputSchema;
  return function (variables: I): GraphQLMutation<I, O> {
    let queryStr =
      `mutation ${name}(` +
      toGraphQLParamsString(mutationVariablesSchema) +
      `) {\n  ${name}(`;
    for (const key of Object.keys(mutationVariablesSchema.shape)) {
      queryStr += `${key}: $${key}, `;
    }
    queryStr = queryStr.slice(0, -2); // Remove the trailing comma and space
    queryStr += ') ' + toGraphQLBlockString('  ', outputSchema) + '\n}';
    return {
      name,
      variables,
      query: queryStr,
    };
  };
}

function getGraphQLName<T extends ZodRawShape>(
  schema: ZodObject<T> | ZodEnum<[string, ...string[]]>
): string {
  const name = (schema._def as GraphQLZodTypeDef).graphQLName;
  if (!name) {
    throw new Error('GraphQL name not found');
  }
  return name;
}

function toGraphQLOutputType(
  registry: Registry,
  type: ZodTypeAny,
  optional?: boolean
): GraphQLOutputType {
  let out: GraphQLOutputType;
  if (type instanceof ZodString) {
    const isGraphQLID = (type._def as GraphQLZodTypeDef).isGraphQLID;
    out = isGraphQLID ? GraphQLID : GraphQLString;
  } else if (type instanceof ZodArray) {
    const elementType = toGraphQLOutputType(registry, type.element, optional);
    out = new GraphQLList(elementType);
  } else if (type instanceof ZodEffects) {
    out = toGraphQLOutputType(registry, type._def.schema, optional);
  } else if (type instanceof ZodOptional) {
    out = toGraphQLOutputType(registry, type._def.innerType, true);
  } else if (type instanceof ZodObject) {
    const graphQLName = getGraphQLName(type);
    const entry = registry.get(graphQLName);
    if (entry === undefined) {
      throw new Error(`No object type found for ${graphQLName}.`);
    }
    if (entry.graphQLType === undefined) {
      // Depth first traversal to ensure we have all types
      updateEntry(registry, entry);
    }
    out = entry.graphQLType as GraphQLObjectType;
  } else if (type instanceof ZodEnum) {
    const graphQLName = getGraphQLName(type);
    const entry = registry.get(graphQLName);
    if (entry === undefined) {
      throw new Error(`No enum type found for ${graphQLName}.`);
    }
    if (entry.graphQLType === undefined) {
      // Depth first traversal to ensure we have all types
      updateEntry(registry, entry);
    }
    out = entry.graphQLType as GraphQLEnumType;
  } else {
    throw new Error(`Unsupported Zod type: ${type._def.typeName}`);
  }
  return optional || type.isOptional() ? out : new GraphQLNonNull(out);
}

function toGraphQLObjectType(
  registry: Registry,
  schema: ZodObject<ZodRawShape>
): GraphQLObjectType {
  const fields: ThunkObjMap<GraphQLFieldConfig<unknown, unknown>> = {};
  for (const [key, value] of Object.entries(schema.shape)) {
    fields[key] = {type: toGraphQLOutputType(registry, value)};
  }
  const name = (schema._def as GraphQLZodTypeDef).graphQLName;
  if (!name) {
    throw new Error('GraphQL name not found');
  }
  return new GraphQLObjectType({
    name,
    fields,
  });
}

function toGraphQLInputObjectType(
  registry: Registry,
  schema: ZodObject<ZodRawShape>
): GraphQLInputType {
  const fields: ThunkObjMap<GraphQLInputFieldConfig> = {};
  for (const [key, value] of Object.entries(schema.shape)) {
    fields[key] = {type: toGraphQLInputType(registry, value)};
  }
  const name = (schema._def as GraphQLZodTypeDef).graphQLName;
  if (!name) {
    throw new Error('GraphQL name not found');
  }
  return new GraphQLInputObjectType({
    name,
    fields,
  });
}

function toGraphQLInputType(
  registry: Registry,
  type: ZodTypeAny,
  optional?: boolean
): GraphQLInputType {
  let out: GraphQLInputType;
  if (type instanceof ZodString) {
    const isGraphQLID = (type._def as GraphQLZodTypeDef).isGraphQLID;
    out = isGraphQLID ? GraphQLID : GraphQLString;
  } else if (type instanceof ZodArray) {
    const elementType = toGraphQLInputType(registry, type.element, optional);
    out = new GraphQLList(elementType);
  } else if (type instanceof ZodEffects) {
    out = toGraphQLInputType(registry, type._def.schema, optional);
  } else if (type instanceof ZodOptional) {
    out = toGraphQLInputType(registry, type._def.innerType, true);
  } else if (type instanceof ZodObject) {
    const graphQLName = getGraphQLName(type);
    const entry = registry.get(graphQLName);
    if (entry === undefined) {
      throw new Error(`No object type found for ${graphQLName}.`);
    }
    if (entry.graphQLType === undefined) {
      // Depth first traversal to ensure we have all types
      updateEntry(registry, entry);
    }
    out = entry.graphQLType as GraphQLInputType;
  } else {
    throw new Error(`Unsupported Zod type: ${type._def.typeName}`);
  }
  return optional || type.isOptional() ? out : new GraphQLNonNull(out);
}

function toGraphQLEnumType<T extends [string, ...string[]]>(
  schema: ZodEnum<T>
): GraphQLEnumType {
  const values: ThunkObjMap<GraphQLEnumValueConfig> = {};
  schema._def.values.forEach((value: string) => {
    values[value] = {value};
  });
  const name = (schema._def as GraphQLZodTypeDef).graphQLName;
  if (!name) {
    throw new Error('GraphQL name not found');
  }
  return new GraphQLEnumType({
    name,
    values,
  });
}

function toGraphQLQueryField(
  registry: Registry,
  schema: ZodObject<ZodRawShape>
): ThunkObjMap<GraphQLFieldConfig<unknown, unknown>> {
  const name = (schema._def as GraphQLZodTypeDef).graphQLName;
  if (!name) {
    throw new Error('GraphQL name not found');
  }
  const outputSchema = (schema._def as GraphQLZodTypeDef).graphQLOutputSchema;
  if (!outputSchema) {
    throw new Error('GraphQL output schema not found');
  }
  const args: GraphQLFieldConfigArgumentMap = {};
  for (const [key, value] of Object.entries(schema.shape)) {
    args[key] = {type: toGraphQLInputType(registry, value)};
  }
  const fields: ThunkObjMap<GraphQLFieldConfig<unknown, unknown>> = {};
  fields[name] = {
    type: toGraphQLOutputType(registry, outputSchema),
    args,
  };
  return fields;
}

function updateEntry(registry: Registry, entry: RegistryEntry) {
  if (entry.type === 'type') {
    if (entry.schema instanceof ZodObject) {
      entry.graphQLType = toGraphQLObjectType(
        registry,
        entry.schema as ZodObject<ZodRawShape>
      );
    } else {
      throw new Error('Expected ZodObject for a GraphQLObjectType');
    }
  } else if (entry.type === 'input') {
    if (entry.schema instanceof ZodObject) {
      entry.graphQLType = toGraphQLInputObjectType(
        registry,
        entry.schema as ZodObject<ZodRawShape>
      );
    } else {
      throw new Error('Expected ZodObject for a GraphQLObjectType');
    }
  } else if (entry.type === 'enum') {
    if (entry.schema instanceof ZodEnum) {
      entry.graphQLType = toGraphQLEnumType(
        entry.schema as ZodEnum<[string, ...string[]]>
      );
    } else {
      throw new Error('Expected ZodEnum for a GraphQLEnumType');
    }
  } else if (entry.type === 'query') {
    let query = registry.get('Query');
    if (!query) {
      query = {schema: entry.schema, type: 'query'};
      registry.set('Query', query);
    }
    entry.graphQLType = toGraphQLQueryField(
      registry,
      entry.schema as ZodObject<ZodRawShape>
    );
  } else if (entry.type === 'mutation') {
    let query = registry.get('Mutation');
    if (!query) {
      query = {schema: entry.schema, type: 'mutation'};
      registry.set('Mutation', query);
    }
    entry.graphQLType = toGraphQLQueryField(
      registry,
      entry.schema as ZodObject<ZodRawShape>
    );
  } else {
    throw new Error(`Unsupported type ${entry.type}`);
  }
}

export function graphQLSchema<
  T extends ZodObject<ZodRawShape> | ZodEnum<[string, ...string[]]>,
>(schemas: T[]): GraphQLSchema {
  // Setup the registry
  const registry: Registry = new Map();
  schemas.forEach(schema => {
    const name = (schema._def as GraphQLZodTypeDef).graphQLName;
    if (!name) {
      throw new Error('GraphQL name not found');
    }
    const type = (schema._def as GraphQLZodTypeDef).graphQLType;
    if (!type) {
      throw new Error('GraphQL type not found');
    }
    registry.set(name, {schema, type});
  });

  // Update the entries to ensure graphQLType is set
  registry.forEach((entry: RegistryEntry) => {
    updateEntry(registry, entry);
  });

  // Get types
  const types = Array.from(registry.values())
    .filter(
      value =>
        value.type === 'type' || value.type === 'enum' || value.type === 'input'
    )
    .map(({graphQLType}) => graphQLType) as GraphQLNamedType[];

  // Get query
  const queryFields = Array.from(registry.values())
    .filter(({type}) => type === 'query')
    .map(
      schema =>
        schema.graphQLType as ThunkObjMap<GraphQLFieldConfig<unknown, unknown>>
    )
    .reduce((acc, fields) => ({...acc, ...fields}), {});

  // Get mutation
  const mutationFields = Array.from(registry.values())
    .filter(({type}) => type === 'mutation')
    .map(
      schema =>
        schema.graphQLType as ThunkObjMap<GraphQLFieldConfig<unknown, unknown>>
    )
    .reduce((acc, fields) => ({...acc, ...fields}), {});

  // Create the schema from the entries
  return new GraphQLSchema({
    types,
    query: new GraphQLObjectType({
      name: 'Query',
      fields: queryFields,
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: mutationFields,
    }),
  });
}

export function graphQLSchemaString<
  T extends ZodObject<ZodRawShape> | ZodEnum<[string, ...string[]]>,
>(schemas: T[]): string {
  return printSchema(graphQLSchema(schemas));
}
