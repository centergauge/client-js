// eslint-disable-next-line n/no-unpublished-import
import {test, expect} from 'vitest';
import {CenterGaugeClient} from './center-gauge-client.mjs';

test('graphQLSchema', () => {
  const schema = CenterGaugeClient.graphQLSchema();
  console.log(schema);
});
