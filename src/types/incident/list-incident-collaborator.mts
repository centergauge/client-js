import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {NextPageSchema} from '../next-page.mjs';
import {IncidentCollaboratorSchema} from './incident-collaborator.mjs';

export const ListIncidentCollaboratorArgsSchema = v.object({
  orgId: IdSchema,
  incidentId: IdSchema,
  limit: v.optional(v.number()),
  page: NextPageSchema,
});
export type ListIncidentCollaboratorArgs = v.InferInput<
  typeof ListIncidentCollaboratorArgsSchema
>;

export const ListIncidentCollaboratorOutputSchema = vg.type(
  'ListIncidentCollaboratorOutput',
  {
    items: v.array(IncidentCollaboratorSchema),
    nextPage: NextPageSchema,
  },
);
export type ListIncidentCollaboratorOutput = v.InferOutput<
  typeof ListIncidentCollaboratorOutputSchema
>;

export const listIncidentCollaborator = vg.query<
  ListIncidentCollaboratorArgs,
  ListIncidentCollaboratorOutput
>(
  'listIncidentCollaborator',
  ListIncidentCollaboratorArgsSchema,
  ListIncidentCollaboratorOutputSchema,
);
