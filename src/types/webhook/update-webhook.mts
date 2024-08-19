import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {EventTransformerSchema} from './event-transformer.mjs';
import {Webhook, WebhookSchema} from './webhook.mjs';

export const UpdateWebhookInputSchema = vg.input('UpdateWebhookInput', {
  id: IdSchema,
  orgId: IdSchema,
  name: v.string(),
  url: v.string(),
  transformer: EventTransformerSchema,
});
export type UpdateWebhookInput = v.InferInput<typeof UpdateWebhookInputSchema>;

export const updateWebhook = vg.mutation<UpdateWebhookInput, Webhook>(
  'updateWebhook',
  UpdateWebhookInputSchema,
  WebhookSchema,
);
