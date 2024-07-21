import * as v from 'valibot';
import {EventSchema} from '../event.mjs';

export const ResourceChangeTypeSchema = v.picklist([
  'resource-created',
  'resource-updated',
  'resource-deleted',
]);
export type ResourceChangeType = v.InferOutput<typeof ResourceChangeTypeSchema>;

export const ResourceChangedEventSchema = v.object({
  ...EventSchema.entries,
  resourceId: v.string(),
  type: ResourceChangeTypeSchema,
});
export type ResourceChangedEvent = v.InferOutput<
  typeof ResourceChangedEventSchema
>;

export function isResourceChangedEvent(o: unknown): o is ResourceChangedEvent {
  return v.safeParse(ResourceChangedEventSchema, o).success;
}
