import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdentityIdSchema, IdentitySchema} from './identity.mjs';
import {IdSchema} from '../id.mjs';

export const OrgRoleSchema = v.picklist(['OWNER', 'ADMIN', 'MEMBER']);
export type OrgRole = v.InferOutput<typeof OrgRoleSchema>;

export const OrgAssignmentSchema = vg.type('OrgAssignment', {
  orgId: IdSchema,
  roles: v.array(OrgRoleSchema),
});

export type OrgAssignment = v.InferOutput<typeof OrgAssignmentSchema>;

export const GetIdentityArgsSchema = v.object({id: IdentityIdSchema});
export type GetIdentityArgs = v.InferInput<typeof GetIdentityArgsSchema>;

export const GetIdentityOutputSchema = vg.type('GetIdentityOutput', {
  ...IdentitySchema.entries,
  assignments: v.array(OrgAssignmentSchema),
});

export type GetIdentityOutput = v.InferOutput<typeof GetIdentityOutputSchema>;

export const getIdentity = vg.query<GetIdentityArgs, GetIdentityOutput>(
  'getIdentity',
  GetIdentityArgsSchema,
  v.optional(GetIdentityOutputSchema),
);

export function getOrgRoles(
  identity: GetIdentityOutput,
  orgId: string,
): OrgRole[] | undefined {
  const orgAssignment = identity.assignments.find((a) => a.orgId === orgId);
  return orgAssignment ? orgAssignment.roles : undefined;
}
