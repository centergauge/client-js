import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';

export const WebhookNotificationFormatSchema = v.picklist([
  'raw',
  'record',
  'slack',
]);
export type WebhookNotificationFormat = v.InferOutput<
  typeof WebhookNotificationFormatSchema
>;

export const WebhookNotificationChannelSchema = vg.type(
  'WebhookNotificationChannel',
  {
    id: IdSchema,
    orgId: IdSchema,
    name: v.string(),
    url: v.string(),
    format: WebhookNotificationFormatSchema,
  },
);
export type WebhookNotificationChannel = v.InferOutput<
  typeof WebhookNotificationChannelSchema
>;
