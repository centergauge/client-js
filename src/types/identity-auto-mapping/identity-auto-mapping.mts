import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {OrgIdSchema} from '../org/index.mjs';

export const IdentityAutoMappingSchema = vg.type('IdentityAutoMapping', {
  orgId: OrgIdSchema,
  domain: v.pipe(v.string(), v.maxLength(253)),
});

export type IdentityAutoMapping = v.InferOutput<
  typeof IdentityAutoMappingSchema
>;
