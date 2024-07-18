import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {OrgIdSchema, OrgNameSchema, OrgSchema, SlugSchema} from './org.mjs';

export const CreateOrgInputSchema = vg.input('CreateOrgInput', {
  id: OrgIdSchema,
  slug: SlugSchema,
  name: OrgNameSchema,
});
export type CreateOrgInput = v.InferInput<typeof CreateOrgInputSchema>;

export const CreateOrgOutputSchema = vg.type('CreateOrgOutput', {
  ...OrgSchema.entries,
});
export type CreateOrgOutput = v.InferOutput<typeof CreateOrgOutputSchema>;

export const createOrg = vg.mutation<CreateOrgInput, CreateOrgOutput>(
  'createOrg',
  CreateOrgInputSchema,
  CreateOrgOutputSchema,
);
