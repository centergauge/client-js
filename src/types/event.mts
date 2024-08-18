import * as v from 'valibot';

export const EventSchema = v.object({
  id: v.pipe(v.string(), v.uuid()), // v1 UUID
  when: v.string(), // ISO formatted date time
  orgId: v.string(),
  type: v.string(),
});
export type Event = v.InferOutput<typeof EventSchema>;

export function isEvent(o: unknown): o is Event {
  return v.safeParse(EventSchema, o).success;
}
