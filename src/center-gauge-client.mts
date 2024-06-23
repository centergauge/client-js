import {ClientCredentialsFlowClient} from '@authsure/flow-client';
import {Amplify} from 'aws-amplify';
import {generateClient, GraphQLResult} from 'aws-amplify/api';
import {V6Client} from '@aws-amplify/api-graphql';
import {ConsoleLogger} from 'aws-amplify/utils';
import {SafeResult} from './safe-result.mjs';
import {CenterGaugeClientError, isCenterGaugeClientError} from './errors.mjs';
import {GraphQLQuery, graphQLSchemaString} from './zod-to-graphql.mjs';
import {
  CreateIdentityInput,
  CreateIdentityMutationVariables,
  CreateIdentityOutput,
  GetIdentityOutput,
  GetIdentityQueryVariables,
  Identity,
  IdentityOrgAssignment,
  OrgAssignment,
  OrgRole,
} from './identity.mjs';

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

  async query<O>(query: GraphQLQuery): Promise<O> {
    return this.executeGraphQL<O>(async () => {
      console.log(await this.graphClient.graphql(query));
      return (await this.graphClient.graphql(query)) as O;
    });
  }

  async querySafe<O>(query: GraphQLQuery): Promise<SafeResult<O>> {
    return this.executeSafeResult(async () => {
      return this.query<O>(query);
    });
  }

  // async getIdentity(id: string): Promise<Identity> {
  //   return this.executeGraphQL<Identity>(async () => {
  //     return (
  //       await this.graphClient.graphql({
  //         query: getIdentity,
  //         variables: {
  //           id,
  //         },
  //       })
  //     ).data.getIdentity as Identity;
  //   });
  // }
  //
  // async getIdentitySafe(id: string): Promise<SafeResult<Identity>> {
  //   return this.executeSafeResult(async () => {
  //     return this.getIdentity(id);
  //   });
  // }
  //
  // async createIdentity(input: CreateIdentity): Promise<Identity> {
  //   return this.executeGraphQL(async () => {
  //     return (
  //       await this.graphClient.graphql({
  //         query: createIdentity,
  //         variables: {
  //           input,
  //         },
  //       })
  //     ).data.createIdentity as Identity;
  //   });
  // }
  //
  // async createIdentitySafe(input: CreateIdentity) {
  //   return this.executeSafeResult(async () => {
  //     return this.createIdentity(input);
  //   });
  // }
  //
  // async updateIdentity(input: UpdateIdentity): Promise<Identity> {
  //   return this.executeGraphQL(async () => {
  //     return (
  //       await this.graphClient.graphql({
  //         query: updateIdentity,
  //         variables: {
  //           input,
  //         },
  //       })
  //     ).data.updateIdentity as Identity;
  //   });
  // }
  //
  // async updateIdentitySafe(input: UpdateIdentity) {
  //   return this.executeSafeResult(async () => {
  //     return this.updateIdentity(input);
  //   });
  // }
  //
  // async getOrg(id: string): Promise<Org> {
  //   return this.executeGraphQL(async () => {
  //     return (
  //       await this.graphClient.graphql({
  //         query: getOrg,
  //         variables: {
  //           id,
  //         },
  //       })
  //     ).data.getOrg as Org;
  //   });
  // }
  //
  // async getOrgSafe(id: string): Promise<SafeResult<Org>> {
  //   return this.executeSafeResult(async () => {
  //     return this.getOrg(id);
  //   });
  // }

  static graphQLSchema(): string {
    return graphQLSchemaString([
      OrgRole,
      OrgAssignment,
      IdentityOrgAssignment,
      Identity,
      GetIdentityOutput,
      GetIdentityQueryVariables,
      CreateIdentityInput,
      CreateIdentityOutput,
      CreateIdentityMutationVariables,
    ]);
  }
}
