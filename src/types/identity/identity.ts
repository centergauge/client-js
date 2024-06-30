import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.js';

export const RoleSchema = v.picklist(['SUPER']);
export const IdentityIdSchema = v.pipe(vg.id(), v.uuid());

export const IdentitySchema = vg.type('Identity', {
  id: IdentityIdSchema,
  givenName: v.pipe(v.string(), v.maxLength(60)),
  familyName: v.pipe(v.string(), v.maxLength(60)),
  email: v.pipe(v.string(), v.email()),
  profilePicture: v.optional(v.pipe(v.string(), v.url())),
  roles: v.optional(v.array(RoleSchema)),
});

export type Identity = v.InferOutput<typeof IdentitySchema>;
