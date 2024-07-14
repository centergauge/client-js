import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {RelationSchema} from '../resource/index.mjs';

export const AlertSeveritySchema = v.picklist(['warning', 'critical']);
export type AlertSeverity = v.InferOutput<typeof AlertSeveritySchema>;

export const AlarmStateSchema = v.picklist(['opened', 'closed']);
export type AlarmState = v.InferOutput<typeof AlarmStateSchema>;

export const AlarmSignalSourceSchema = v.picklist([
  'cloudwatch',
  'opensearch',
  'prometheus',
]);
export type AlarmSignalSource = v.InferOutput<typeof AlarmSignalSourceSchema>;

export const AlertOrgSchema = vg.type('AlertOrg', {
  id: v.string(),
  slug: v.string(),
  name: v.string(),
});
export type AlertOrg = v.InferOutput<typeof AlertOrgSchema>;

export const AlertSchema = vg.type('Alert', {
  id: v.string(),
  orgId: v.string(),
  orgName: v.string(),
  severity: AlertSeveritySchema,
  state: AlarmStateSchema,
  when: v.string(),
  source: AlarmSignalSourceSchema,
  name: v.string(),
  reason: v.optional(v.string()),
  relations: v.array(RelationSchema),
});
export type Alert = v.InferOutput<typeof AlertSchema>;
