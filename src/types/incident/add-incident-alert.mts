import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Incident, IncidentSchema} from './incident.mjs';

export const AddIncidentAlertInputSchema = vg.input('AddIncidentAlertInput', {
  orgId: IdSchema,
  incidentId: IdSchema,
  id: v.string(),
});
export type AddIncidentAlertInput = v.InferInput<
  typeof AddIncidentAlertInputSchema
>;

export const addIncidentAlert = vg.mutation<AddIncidentAlertInput, Incident>(
  'addIncidentAlert',
  AddIncidentAlertInputSchema,
  IncidentSchema,
);
