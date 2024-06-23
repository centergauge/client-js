// eslint-disable-next-line n/no-unpublished-import
import {test, expect} from 'vitest';
import {CenterGaugeClient} from './center-gauge-client.js';

test('graphQLSchema', () => {
  const schema = CenterGaugeClient.graphQLSchema();
  expect(schema).toBeDefined();
  console.log(schema);
});
