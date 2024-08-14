import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Incident, IncidentSchema} from './incident.mjs';

export const AddIncidentCollaboratorInputSchema = vg.input(
  'AddCollaboratorInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    identityId: IdSchema,
  },
);
export type AddIncidentCollaboratorInput = v.InferInput<
  typeof AddIncidentCollaboratorInputSchema
>;

export const addIncidentCollaborator = vg.mutation<
  AddIncidentCollaboratorInput,
  Incident
>(
  'addIncidentCollaborator',
  AddIncidentCollaboratorInputSchema,
  IncidentSchema,
);
