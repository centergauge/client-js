import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {
  IncidentCollaborator,
  IncidentCollaboratorSchema,
} from './incident-collaborator.mjs';

export const AddIncidentCollaboratorInputSchema = vg.input(
  'AddCollaboratorInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    name: v.string(),
    title: v.optional(v.string()),
    email: v.optional(v.pipe(v.string(), v.email())),
    phone: v.optional(v.string()),
  },
);
export type AddIncidentCollaboratorInput = v.InferInput<
  typeof AddIncidentCollaboratorInputSchema
>;

export const addIncidentCollaborator = vg.mutation<
  AddIncidentCollaboratorInput,
  IncidentCollaborator
>(
  'addIncidentCollaborator',
  AddIncidentCollaboratorInputSchema,
  IncidentCollaboratorSchema,
);
