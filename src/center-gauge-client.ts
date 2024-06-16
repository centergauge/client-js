import {ClientCredentialsFlowClient, FlowClient} from '@authsure/flow-client';

export interface ClientCredentialsConfig {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly scopes?: string[];
}

export class CenterGaugeClient {
  protected flowClient: FlowClient;
  constructor(config: ClientCredentialsConfig) {
    this.flowClient = new ClientCredentialsFlowClient({
      authSureDomain: 'centergauge.authsure.io',
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      scopes: config.scopes ?? ['api', 'graph'],
    });
  }
}
