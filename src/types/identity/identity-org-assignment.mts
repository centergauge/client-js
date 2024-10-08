import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {OrgRoleSchema} from './index.mjs';
import {IdSchema} from '../id.mjs';

export const IdentityOrgAssignmentSchema = vg.type('IdentityAssignment', {
  orgId: IdSchema,
  identityId: IdSchema,
  roles: v.array(OrgRoleSchema),
});

export type IdentityOrgAssignment = v.InferOutput<
  typeof IdentityOrgAssignmentSchema
>;
