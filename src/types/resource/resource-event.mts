import * as v from 'valibot';
import {EventSchema} from '../event.mjs';

export const ResourceEventTypeSchema = v.picklist([
  'resource-created',
  'resource-updated',
  'resource-deleted',
]);
export type ResourceEventType = v.InferOutput<typeof ResourceEventTypeSchema>;

export const ResourceEventSchema = v.object({
  ...EventSchema.entries,
  resourceId: v.string(),
  type: ResourceEventTypeSchema,
});
export type ResourceEvent = v.InferOutput<typeof ResourceEventSchema>;

export function isResourceEvent(o: unknown): o is ResourceEvent {
  return v.safeParse(ResourceEventSchema, o).success;
}
