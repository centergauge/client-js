import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {OrgSchema} from './org.mjs';

export const CreateOrgInputSchema = vg.input('CreateOrgInput', {
  ...OrgSchema.entries,
});
export type CreateOrgInput = v.InferInput<typeof CreateOrgInputSchema>;

export const CreateOrgOutputSchema = vg.type('CreateOrgOutput', {
  ...OrgSchema.entries,
});
export type CreateOrgOutput = v.InferOutput<typeof CreateOrgOutputSchema>;

export const createOrg = vg.mutation<CreateOrgInput, CreateOrgOutput>(
  'createOrg',
  CreateOrgInputSchema,
  CreateOrgOutputSchema
);
