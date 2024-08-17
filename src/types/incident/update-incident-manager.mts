import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Incident, IncidentSchema} from './incident.mjs';
import {IncidentManagerInputSchema} from './incident-manager-input.mjs';

export const UpdateIncidentManagerInputSchema = vg.input(
  'UpdateIncidentManagerInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    incidentManager: IncidentManagerInputSchema,
  },
);
export type UpdateIncidentManagerInput = v.InferInput<
  typeof UpdateIncidentManagerInputSchema
>;

export const updateIncidentManager = vg.mutation<
  UpdateIncidentManagerInput,
  Incident
>('updateIncidentManager', UpdateIncidentManagerInputSchema, IncidentSchema);
