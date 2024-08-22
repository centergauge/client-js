import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';

export const GetActiveIncidentForAlertArgsSchema = v.object({
  orgId: IdSchema,
  alertId: IdSchema,
});
export type GetActiveIncidentForAlertArgs = v.InferInput<
  typeof GetActiveIncidentForAlertArgsSchema
>;

export const GetActiveIncidentForAlertOutputSchema = vg.type(
  'GetActiveIncidentForAlertOutput',
  {
    id: v.string(),
    incidentId: IdSchema,
    orgId: IdSchema,
  },
);
export type GetActiveIncidentForAlertOutput = v.InferOutput<
  typeof GetActiveIncidentForAlertOutputSchema
>;

export const getActiveIncidentForAlert = vg.query<
  GetActiveIncidentForAlertArgs,
  GetActiveIncidentForAlertOutput
>(
  'getActiveIncidentForAlert',
  GetActiveIncidentForAlertArgsSchema,
  v.optional(GetActiveIncidentForAlertOutputSchema),
);
