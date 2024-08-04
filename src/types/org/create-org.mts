import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {OrgNameSchema, OrgSchema, SlugSchema} from './org.mjs';
import {IdSchema} from '../id.mjs';

export const CreateOrgInputSchema = vg.input('CreateOrgInput', {
  id: IdSchema,
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
