import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {Incident, IncidentSchema} from './incident.mjs';
import {IdSchema} from '../id.mjs';

export const RemoveIncidentAlertInputSchema = vg.input(
  'RemoveIncidentAlertInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    alertId: IdSchema,
  },
);
export type RemoveIncidentAlertInput = v.InferInput<
  typeof RemoveIncidentAlertInputSchema
>;

export const removeIncidentAlert = vg.mutation<
  RemoveIncidentAlertInput,
  Incident
>('removeIncidentAlert', RemoveIncidentAlertInputSchema, IncidentSchema);
