import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {EventTransformerSchema} from './event-transformer.mjs';

export const WebhookSchema = vg.type('Webhook', {
  id: IdSchema,
  orgId: IdSchema,
  name: v.string(),
  url: v.string(),
  transformer: EventTransformerSchema,
});
export type Webhook = v.InferOutput<typeof WebhookSchema>;
