import {ClientCredentialsFlowClient} from '@authsure/flow-client';
import {Amplify} from 'aws-amplify';
import {generateClient, GraphQLResult} from 'aws-amplify/api';
import {V6Client} from '@aws-amplify/api-graphql';
import {ConsoleLogger} from 'aws-amplify/utils';
import {SafeResult} from './safe-result.mjs';
import {CenterGaugeClientError, isCenterGaugeClientError} from './errors.mjs';
import {
  getIdentity,
  GetIdentityOutputSchema,
  IdentitySchema,
  Mutation,
  OrgAssignmentSchema,
  OrgSchema,
  Query,
  toGraphQLSchemaString,
  createIdentity,
  CreateIdentityInputSchema,
  CreateIdentityOutputSchema,
} from './types/index.mjs';
import {
  CreateOrgInputSchema,
  CreateOrgOutputSchema,
} from './types/org/create-org.mjs';

export interface ClientCredentialsConfig {
  readonly clientId: string | Promise<string>;
  readonly clientSecret: string | Promise<string>;
  readonly scope?: string | string[];
}

export interface CenterGaugeClientConfig {
  readonly graphEndpoint?: string;
  readonly enableDebug?: boolean;
  readonly auth: ClientCredentialsConfig;
}

function isGraphQLResult<T>(result: unknown): result is GraphQLResult<T> {
  return (
    typeof result === 'object' &&
    result !== null &&
    'data' in (result as Record<string, unknown>) &&
    (!('errors' in result) ||
      Array.isArray((result as GraphQLResult<T>).errors)) &&
    (!('extensions' in result) ||
      typeof (result as GraphQLResult<T>).extensions === 'object')
  );
}

export class CenterGaugeClient {
  protected flowClient: ClientCredentialsFlowClient;
  protected graphClient: V6Client;

  constructor(config: CenterGaugeClientConfig) {
    if (config.enableDebug) {
      ConsoleLogger.LOG_LEVEL = 'VERBOSE';
    }
    this.flowClient = new ClientCredentialsFlowClient({
      authSureDomain: 'centergauge.authsure.io',
      clientId: config.auth.clientId,
      clientSecret: config.auth.clientSecret,
      scope: config.auth.scope ?? 'graph api',
    });
    Amplify.configure(
      {
        API: {
          GraphQL: {
            endpoint:
              config.graphEndpoint ?? 'https://graph.centergauge.com/graphql',
            customEndpoint:
              config.graphEndpoint ?? 'https://graph.centergauge.com/graphql',
            defaultAuthMode: 'none',
          },
        },
      },
      {
        API: {
          GraphQL: {
            headers: async () => {
              const token = await this.flowClient.getTokenSafe();
              if (!token.success) {
                throw new CenterGaugeClientError(
                  'Failed to get token',
                  token.error
                );
              }
              return {
                Authorization: `Bearer ${token.result!.accessToken}`,
              };
            },
          },
        },
      }
    );
    this.graphClient = generateClient();
  }

  protected async executeGraphQL<T>(fn: () => Promise<T>): Promise<T> {
    try {
      return await fn();
    } catch (e) {
      if (isGraphQLResult(e)) {
        if (e.errors) {
          throw new CenterGaugeClientError(
            e.errors.length === 1
              ? e.errors[0].message
              : 'Multiple errors: [' +
                e.errors.map(err => err.message).join(', ') +
                ']',
            e
          );
        }
      }
      throw new CenterGaugeClientError('Unknown error', e);
    }
  }

  protected safeResultError<T>(e: unknown): SafeResult<T> {
    if (isCenterGaugeClientError(e)) {
      return {
        success: false,
        error: e,
        result: null,
      };
    }
    return {
      success: false,
      error:
        e instanceof Error
          ? new CenterGaugeClientError(e.message, e)
          : new CenterGaugeClientError('Unknown error', e),
      result: null,
    };
  }

  protected async executeSafeResult<T>(
    fn: () => Promise<T>
  ): Promise<SafeResult<T>> {
    try {
      const result = await fn();
      return {
        success: true,
        error: null,
        result,
      };
    } catch (e) {
      return this.safeResultError<T>(e);
    }
  }

  async query<I, O>(query: Query<I, O>): Promise<O | null> {
    return this.executeGraphQL<O>(async () => {
      const result = (await this.graphClient.graphql(
        query
      )) as GraphQLResult<unknown>;
      return (result.data as Record<string, unknown>)[query.name] as O;
    });
  }

  async safeQuery<I, O>(query: Query<I, O>): Promise<SafeResult<O | null>> {
    return this.executeSafeResult(async () => {
      return this.query<I, O>(query);
    });
  }

  async mutate<I, O>(mutation: Mutation<I, O>): Promise<O | null> {
    return this.executeGraphQL<O>(async () => {
      const result = (await this.graphClient.graphql(
        mutation
      )) as GraphQLResult<unknown>;
      return (result.data as Record<string, unknown>)[mutation.name] as O;
    });
  }

  async safeMutate<I, O>(
    mutation: Mutation<I, O>
  ): Promise<SafeResult<O | null>> {
    return this.executeSafeResult(async () => {
      return this.mutate<I, O>(mutation);
    });
  }

  static graphQLSchema(): string {
    return toGraphQLSchemaString({
      types: [
        OrgSchema,
        OrgAssignmentSchema,
        IdentitySchema,
        GetIdentityOutputSchema,
        CreateIdentityOutputSchema,
        CreateOrgOutputSchema,
      ],
      inputs: [CreateIdentityInputSchema, CreateOrgInputSchema],
      queries: [getIdentity],
      mutations: [createIdentity],
    });
  }
}
