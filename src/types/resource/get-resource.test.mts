import {test, expect} from 'vitest';
import {getResource} from './get-resource.mjs';

test('Test getResource', () => {
  const call = getResource({id: '1'});
  // console.log(call);
  expect(call.query).toContain('... on StringProperty');
});
