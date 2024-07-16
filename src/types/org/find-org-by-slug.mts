import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {GetOrgOutputSchema} from './get-org.mjs';

export const FindOrgBySlugArgsSchema = v.object({slug: v.string()});
export type FindOrgBySlugArgs = v.InferInput<typeof FindOrgBySlugArgsSchema>;

export const FindOrgBySlugOutputSchema = vg.type('FindOrgBySlugOutput', {
  ...GetOrgOutputSchema.entries,
});
export type FindOrgBySlugOutput = v.InferOutput<
  typeof FindOrgBySlugOutputSchema
>;

export const findOrgBySlug = vg.query<FindOrgBySlugArgs, FindOrgBySlugOutput>(
  'findOrgBySlug',
  FindOrgBySlugArgsSchema,
  v.optional(FindOrgBySlugOutputSchema),
);
