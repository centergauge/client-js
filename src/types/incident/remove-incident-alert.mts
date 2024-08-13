import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {Incident, IncidentSchema} from './incident.mjs';

export const RemoveIncidentAlertInputSchema = vg.input(
  'RemoveIncidentAlertInput',
  {
    incidentId: v.string(),
    alert: v.string(),
  },
);
export type RemoveIncidentAlertInput = v.InferInput<
  typeof RemoveIncidentAlertInputSchema
>;

export const removeIncidentAlert = vg.mutation<
  RemoveIncidentAlertInput,
  Incident
>('removeIncidentAlert', RemoveIncidentAlertInputSchema, IncidentSchema);
