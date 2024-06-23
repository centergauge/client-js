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
  ZodSchema,
  ZodArray,
  ZodEffects,
  ZodObject,
  ZodRawShape,
  ZodTypeAny,
  ZodString,
  ZodOptional,
  ZodEnum,
} from 'zod';

interface RegistryEntry {
  schema: ZodSchema;
  type: 'type' | 'input' | 'enum' | 'query' | 'mutation';
  graphQLType?:
    | GraphQLObjectType
    | GraphQLEnumType
    | GraphQLInputType
    | ThunkObjMap<GraphQLFieldConfig<unknown, unknown>>;
}

type Registry = Map<string, RegistryEntry>;
export type GraphQLQuery = {
  variables: Record<any, any>;
  query: string;
};
export type GraphQLMutation = {
  variables: Record<any, any>;
  query: string;
};

export function graphQLID(schema: ZodString) {
  (schema._def as any).isGraphQLID = true;
  return schema;
}

export function graphQLType(schema: ZodObject<any>, name: string) {
  (schema._def as any).graphQLName = name;
  (schema._def as any).graphQLType = 'type';
  return schema;
}

export function graphQLInput(schema: ZodObject<any>, name: string) {
  (schema._def as any).graphQLName = name;
  (schema._def as any).graphQLType = 'input';
  return schema;
}

export function graphQLEnum(schema: ZodEnum<any>, name: string) {
  (schema._def as any).graphQLName = name;
  (schema._def as any).graphQLType = 'enum';
  return schema;
}

function getRootZodObject(type: ZodTypeAny): ZodObject<any> | undefined {
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

function toGraphQLParamsString(schema: ZodObject<any>): string {
  let queryStr = '';
  for (const [key, value] of Object.entries(schema.shape)) {
    if (value instanceof ZodString) {
      if ((value._def as any).isGraphQLID) {
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

export function graphQLQuery(
  name: string,
  queryVariablesSchema: ZodObject<any>,
  outputSchema: ZodObject<any>
) {
  (queryVariablesSchema._def as any).graphQLName = name;
  (queryVariablesSchema._def as any).graphQLType = 'query';
  (queryVariablesSchema._def as any).graphQLOutputSchema = outputSchema;
  return function (
    variables: z.infer<typeof queryVariablesSchema>
  ): GraphQLQuery {
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
      variables,
      query: queryStr,
    };
  };
}

export function graphQLMutation(
  name: string,
  mutationVariablesSchema: ZodObject<any>,
  outputSchema: ZodObject<any>
) {
  (mutationVariablesSchema._def as any).graphQLName = name;
  (mutationVariablesSchema._def as any).graphQLType = 'mutation';
  (mutationVariablesSchema._def as any).graphQLOutputSchema = outputSchema;
  return function (
    variables: z.infer<typeof mutationVariablesSchema>
  ): GraphQLMutation {
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
      variables,
      query: queryStr,
    };
  };
}

function getGraphQLName(schema: ZodObject<any> | ZodEnum<any>): string {
  const name = (schema._def as any).graphQLName;
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
    const isGraphQLID = (type._def as any).isGraphQLID;
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
  const name = (schema._def as any).graphQLName;
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
  const name = (schema._def as any).graphQLName;
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
    const isGraphQLID = (type._def as any).isGraphQLID;
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

function toGraphQLEnumType(schema: ZodEnum<any>): GraphQLEnumType {
  const values: ThunkObjMap<GraphQLEnumValueConfig> = {};
  schema._def.values.forEach((value: any) => {
    values[value] = {value};
  });
  const name = (schema._def as any).graphQLName;
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
  const name = (schema._def as any).graphQLName;
  if (!name) {
    throw new Error('GraphQL name not found');
  }
  const outputSchema = (schema._def as any).graphQLOutputSchema;
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
        entry.schema as ZodObject<any>
      );
    } else {
      throw new Error('Expected ZodObject for a GraphQLObjectType');
    }
  } else if (entry.type === 'input') {
    if (entry.schema instanceof ZodObject) {
      entry.graphQLType = toGraphQLInputObjectType(
        registry,
        entry.schema as ZodObject<any>
      );
    } else {
      throw new Error('Expected ZodObject for a GraphQLObjectType');
    }
  } else if (entry.type === 'enum') {
    if (entry.schema instanceof ZodEnum) {
      entry.graphQLType = toGraphQLEnumType(entry.schema as ZodEnum<any>);
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
      entry.schema as ZodObject<any>
    );
  } else if (entry.type === 'mutation') {
    let query = registry.get('Mutation');
    if (!query) {
      query = {schema: entry.schema, type: 'mutation'};
      registry.set('Mutation', query);
    }
    entry.graphQLType = toGraphQLQueryField(
      registry,
      entry.schema as ZodObject<any>
    );
  } else {
    throw new Error(`Unsupported type ${entry.type}`);
  }
}

export function graphQLSchema(schemas: ZodSchema[]): GraphQLSchema {
  // Setup the registry
  const registry: Registry = new Map();
  schemas.forEach(schema => {
    const name = (schema._def as any).graphQLName;
    if (!name) {
      throw new Error('GraphQL name not found');
    }
    const type = (schema._def as any).graphQLType;
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

export function graphQLSchemaString(schemas: ZodSchema[]): string {
  return printSchema(graphQLSchema(schemas));
}
