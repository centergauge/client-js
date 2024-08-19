import {test, expect} from 'vitest';
import {getResource} from './get-resource.mjs';

test('Test getResource', () => {
  const call = getResource({orgId: '1', id: '1', project: true});
  // console.log(call);
  expect(call.query).toContain('... on StringProperty');
});
