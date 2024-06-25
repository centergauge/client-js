// eslint-disable-next-line n/no-unpublished-import
import {test, expect} from 'vitest';
import {CenterGaugeClient} from './center-gauge-client.js';
import * as fs from 'fs';

test('graphQLSchema', () => {
  const schema = CenterGaugeClient.graphQLSchema();
  expect(schema).toBeDefined();
  fs.writeFileSync('schema.graphql', schema, 'utf-8');
});
