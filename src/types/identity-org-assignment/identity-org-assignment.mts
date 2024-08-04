import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdentityIdSchema, OrgRoleSchema} from '../identity/index.mjs';
import {IdSchema} from '../id.mjs';

export const IdentityOrgAssignmentSchema = vg.type('IdentityAssignment', {
  orgId: IdSchema,
  identityId: IdentityIdSchema,
  roles: v.array(OrgRoleSchema),
});

export type IdentityOrgAssignment = v.InferOutput<
  typeof IdentityOrgAssignmentSchema
>;
