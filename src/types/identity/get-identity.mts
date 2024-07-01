import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {OrgIdSchema} from '../org/org.mjs';
import {IdentityIdSchema, IdentitySchema} from './identity.mjs';

const OrgRoleSchema = v.picklist(['OWNER', 'ADMIN', 'MEMBER']);

export const OrgAssignmentSchema = vg.type('OrgAssignment', {
  orgId: OrgIdSchema,
  roles: v.array(OrgRoleSchema),
});

export type OrgAssignment = v.InferOutput<typeof OrgAssignmentSchema>;

export const GetIdentityArgs = v.object({id: IdentityIdSchema});

export const GetIdentityOutputSchema = vg.type('GetIdentityOutput', {
  ...IdentitySchema.entries,
  assignments: v.array(OrgAssignmentSchema),
});

export type GetIdentityOutput = v.InferOutput<typeof GetIdentityOutputSchema>;

export const getIdentity = vg.query(
  'getIdentity',
  GetIdentityArgs,
  v.optional(GetIdentityOutputSchema)
);
