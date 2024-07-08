import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {
  IdentityOrgAssignment,
  IdentityOrgAssignmentSchema,
} from './identity-org-assignment.mjs';

export const CreateIdentityOrgAssignmentInputSchema = vg.input(
  'CreateIdentityOrgAssignment',
  {
    ...IdentityOrgAssignmentSchema.entries,
  }
);
export type CreateIdentityOrgAssignmentInput = v.InferInput<
  typeof CreateIdentityOrgAssignmentInputSchema
>;

export const CreateIdentityOrgAssignmentOutputSchema = vg.type(
  'CreateIdentityOrgAssignmentOutput',
  {
    ...IdentityOrgAssignmentSchema.entries,
  }
);

export type CreateIdentityOrgAssignmentOutput = v.InferOutput<
  typeof CreateIdentityOrgAssignmentOutputSchema
>;

export const createIdentityOrgAssignment = vg.mutation<
  CreateIdentityOrgAssignmentInput,
  CreateIdentityOrgAssignmentOutput
>(
  'createIdentityOrgAssignment',
  CreateIdentityOrgAssignmentInputSchema,
  CreateIdentityOrgAssignmentOutputSchema
);
