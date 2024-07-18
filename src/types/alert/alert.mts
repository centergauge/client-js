import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {RelatedResourceSchema} from '../resource/index.mjs';

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

export const AlertSchema = vg.type('Alert', {
  id: v.string(),
  orgId: v.string(),
  orgName: v.string(),
  severity: AlertSeveritySchema,
  when: v.string(),
  source: AlarmSignalSourceSchema,
  alarmId: v.string(),
  alarmName: v.string(),
  alarmState: AlarmStateSchema,
  reason: v.optional(v.string()),
  relations: v.array(RelatedResourceSchema),
});
export type Alert = v.InferOutput<typeof AlertSchema>;

export function isAlert(o: unknown): o is Alert {
  return v.safeParse(AlertSchema, o).success;
}
