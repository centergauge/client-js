import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';

export const RoleSchema = v.picklist(['SUPER']);
export type Role = v.InferOutput<typeof RoleSchema>;

export const IdentitySchema = vg.type('Identity', {
  id: IdSchema,
  givenName: v.pipe(v.string(), v.maxLength(60)),
  familyName: v.pipe(v.string(), v.maxLength(60)),
  email: v.pipe(v.string(), v.email()),
  profilePicture: v.optional(v.pipe(v.string(), v.url())),
  roles: v.array(RoleSchema),
});

export type Identity = v.InferOutput<typeof IdentitySchema>;
