import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Incident, IncidentSchema} from './incident.mjs';

export const GetActiveIncidentForAlertArgsSchema = v.object({
  orgId: IdSchema,
  alertId: IdSchema,
});
export type GetActiveIncidentForAlertArgs = v.InferInput<
  typeof GetActiveIncidentForAlertArgsSchema
>;

export const getActiveIncidentForAlert = vg.query<
  GetActiveIncidentForAlertArgs,
  Incident
>(
  'getActiveIncidentForAlert',
  GetActiveIncidentForAlertArgsSchema,
  v.optional(IncidentSchema),
);
