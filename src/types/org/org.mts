import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';

export const OrgIdSchema = v.pipe(vg.id(), v.uuid());

export const SlugSchema = v.pipe(v.string(), v.minLength(3), v.maxLength(30));

export const OrgNameSchema = v.pipe(
  v.string(),
  v.minLength(3),
  v.maxLength(60),
);

export const OrgSchema = vg.type('Org', {
  id: OrgIdSchema,
  slug: SlugSchema,
  name: OrgNameSchema,
  lightIcon: v.optional(v.pipe(v.string(), v.url())),
  darkIcon: v.optional(v.pipe(v.string(), v.url())),
  publicSignInEnabled: v.optional(v.boolean()),
  publicSupportEnabled: v.optional(v.boolean()),
});

export type Org = v.InferOutput<typeof OrgSchema>;
