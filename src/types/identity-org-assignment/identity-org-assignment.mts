import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {OrgIdSchema} from '../org/index.mjs';
import {IdentityIdSchema, OrgRoleSchema} from '../identity/index.mjs';

export const IdentityOrgAssignmentSchema = vg.type('IdentityAssignment', {
  orgId: OrgIdSchema,
  identityId: IdentityIdSchema,
  roles: v.array(OrgRoleSchema),
});

export type IdentityOrgAssignment = v.InferOutput<
  typeof IdentityOrgAssignmentSchema
>;
