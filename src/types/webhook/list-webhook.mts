import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {WebhookSchema} from './webhook.mjs';

export const ListWebhookArgsSchema = v.object({orgId: IdSchema});
export type ListWebhookArgs = v.InferOutput<typeof ListWebhookArgsSchema>;

export const ListWebhookOutputSchema = vg.type('ListWebhookOutput', {
  items: v.array(WebhookSchema),
});
export type ListWebhookOutput = v.InferOutput<typeof ListWebhookOutputSchema>;

export const listWebhook = vg.query<ListWebhookArgs, ListWebhookOutput>(
  'listWebhook',
  ListWebhookArgsSchema,
  ListWebhookOutputSchema,
);
