import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {
  OperationSuccess,
  OperationSuccessSchema,
} from '../operation-success.mjs';

export const RemoveIncidentCollaboratorInputSchema = vg.input(
  'RemoveIncidentCollaboratorInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    collaboratorId: IdSchema,
  },
);
export type RemoveIncidentCollaboratorInput = v.InferInput<
  typeof RemoveIncidentCollaboratorInputSchema
>;

export const removeIncidentCollaborator = vg.mutation<
  RemoveIncidentCollaboratorInput,
  OperationSuccess
>(
  'removeIncidentCollaborator',
  RemoveIncidentCollaboratorInputSchema,
  OperationSuccessSchema,
);
