import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {WebhookSchema} from '../webhook/index.mjs';

export const EventRouterTypeSchema = v.picklist(['alert', 'incident-opened']);
export type EventRouterType = v.InferOutput<typeof EventRouterTypeSchema>;

export const EventRouterSchema = vg.type('EventRouter', {
  id: IdSchema,
  orgId: IdSchema,
  name: v.string(),
  webhooks: v.array(WebhookSchema),
  type: EventRouterTypeSchema,
  // TODO Add the ability to add filter expressions
});
export type EventRouter = v.InferOutput<typeof EventRouterSchema>;
