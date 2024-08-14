import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Incident, IncidentSchema} from './incident.mjs';

export const RemoveIncidentResourceInputSchema = vg.input(
  'RemoveIncidentResourceInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    resource: v.string(),
  },
);
export type RemoveIncidentResourceInput = v.InferInput<
  typeof RemoveIncidentResourceInputSchema
>;

export const removeIncidentResource = vg.mutation<
  RemoveIncidentResourceInput,
  Incident
>('removeIncidentResource', RemoveIncidentResourceInputSchema, IncidentSchema);
