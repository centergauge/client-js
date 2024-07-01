import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';

export const OrgIdSchema = v.pipe(vg.id(), v.uuid());

export const OrgSchema = vg.type('Org', {
  id: OrgIdSchema,
  slug: v.pipe(v.string(), v.minLength(3), v.maxLength(30)),
  name: v.pipe(v.string(), v.minLength(3), v.maxLength(60)),
  lightIcon: v.optional(v.pipe(v.string(), v.url())),
  darkIcon: v.optional(v.pipe(v.string(), v.url())),
  publicSignInEnabled: v.optional(v.boolean()),
  publicSupportEnabled: v.optional(v.boolean()),
});

export type Org = v.InferOutput<typeof OrgSchema>;
