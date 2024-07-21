import * as v from 'valibot';

export const ResourceServiceSchema = v.picklist([
  'cloudwatch',
  'lambda',
  'root',
  's3',
]);
export type ResourceService = v.InferOutput<typeof ResourceServiceSchema>;

export function isResourceService(value: unknown): value is ResourceService {
  switch (value) {
    case 'cloudwatch':
    case 'lambda':
    case 's3':
    case 'root':
      return true;
    default:
      return false;
  }
}
