import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {EventTransformerSchema} from './event-transformer.mjs';
import {Webhook, WebhookSchema} from './webhook.mjs';

export const CreateWebhookInputSchema = vg.input('CreateWebhook', {
  orgId: IdSchema,
  name: v.string(),
  url: v.string(),
  transformer: EventTransformerSchema,
});
export type CreateWebhookInput = v.InferInput<typeof CreateWebhookInputSchema>;

export const createWebhook = vg.mutation<CreateWebhookInput, Webhook>(
  'createWebhook',
  CreateWebhookInputSchema,
  WebhookSchema,
);
