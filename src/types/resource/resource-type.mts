import * as v from 'valibot';

export const ResourceTypeSchema = v.picklist([
  'account',
  'alarm',
  'bucket',
  'function',
]);
export type ResourceType = v.InferOutput<typeof ResourceTypeSchema>;

export function isResourceType(value: unknown): value is ResourceType {
  switch (value) {
    case 'account':
    case 'alarm':
    case 'bucket':
    case 'function':
      return true;
    default:
      return false;
  }
}
