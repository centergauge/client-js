import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Incident, IncidentSchema} from './incident.mjs';

export const UpdateIncidentManagerInputSchema = vg.input(
  'UpdateIncidentManagerInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    managerId: v.optional(IdSchema),
  },
);
export type UpdateIncidentManagerInput = v.InferInput<
  typeof UpdateIncidentManagerInputSchema
>;

export const updateIncidentManager = vg.mutation<
  UpdateIncidentManagerInput,
  Incident
>('updateIncidentManager', UpdateIncidentManagerInputSchema, IncidentSchema);
