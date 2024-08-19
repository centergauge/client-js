import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {
  IncidentCollaborator,
  IncidentCollaboratorSchema,
} from './incident-collaborator.mjs';

export const UpdateIncidentCollaboratorInputSchema = vg.input(
  'UpdateIncidentCollaboratorInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    collaboratorId: IdSchema,
    name: v.string(),
    title: v.optional(v.string()),
    email: v.optional(v.pipe(v.string(), v.email())),
    phone: v.optional(v.string()),
  },
);
export type UpdateIncidentCollaboratorInput = v.InferInput<
  typeof UpdateIncidentCollaboratorInputSchema
>;

export const updateIncidentCollaborator = vg.mutation<
  UpdateIncidentCollaboratorInput,
  IncidentCollaborator
>(
  'updateIncidentCollaborator',
  UpdateIncidentCollaboratorInputSchema,
  IncidentCollaboratorSchema,
);
