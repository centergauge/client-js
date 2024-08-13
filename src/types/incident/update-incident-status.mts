import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Incident, IncidentSchema, IncidentStatusSchema} from './incident.mjs';

export const UpdateIncidentStatusInputSchema = vg.input(
  'UpdateIncidentStatusInput',
  {
    orgId: IdSchema,
    id: IdSchema,
    status: IncidentStatusSchema,
  },
);
export type UpdateIncidentStatusInput = v.InferInput<
  typeof UpdateIncidentStatusInputSchema
>;

export const updateIncidentStatus = vg.mutation<
  UpdateIncidentStatusInput,
  Incident
>('updateIncidentStatus', UpdateIncidentStatusInputSchema, IncidentSchema);
