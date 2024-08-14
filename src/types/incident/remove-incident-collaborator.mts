import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Incident, IncidentSchema} from './incident.mjs';

export const RemoveIncidentCollaboratorInputSchema = vg.input(
  'RemoveIncidentCollaboratorInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    identityId: IdSchema,
  },
);
export type RemoveIncidentCollaboratorInput = v.InferInput<
  typeof RemoveIncidentCollaboratorInputSchema
>;

export const removeIncidentCollaborator = vg.mutation<
  RemoveIncidentCollaboratorInput,
  Incident
>(
  'removeIncidentCollaborator',
  RemoveIncidentCollaboratorInputSchema,
  IncidentSchema,
);
