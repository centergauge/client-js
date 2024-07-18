import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {
  AlarmSignalSourceSchema,
  AlarmStateSchema,
  AlertSeveritySchema,
} from './alert.mjs';
import {RelatedResourceInputSchema} from '../resource/index.mjs';

export const AlertInputSchema = vg.input('CreateAlertInput', {
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
  relations: v.array(RelatedResourceInputSchema),
});
export type AlertInput = v.InferInput<typeof AlertInputSchema>;
