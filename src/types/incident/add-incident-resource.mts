import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Incident, IncidentSchema} from './incident.mjs';

export const AddIncidentResourceInputSchema = vg.input(
  'AddIncidentResourceInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    id: v.string(),
  },
);
export type AddIncidentResourceInput = v.InferInput<
  typeof AddIncidentResourceInputSchema
>;

export const addIncidentResource = vg.mutation<
  AddIncidentResourceInput,
  Incident
>('addIncidentResource', AddIncidentResourceInputSchema, IncidentSchema);
