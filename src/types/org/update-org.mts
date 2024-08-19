import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {OrgSchema} from './org.mjs';

export const UpdateOrgInputSchema = vg.input('UpdateOrgInput', {
  ...OrgSchema.entries,
});

export type UpdateOrgInput = v.InferInput<typeof UpdateOrgInputSchema>;

export const UpdateOrgOutputSchema = vg.type('UpdateOrgOutput', {
  ...OrgSchema.entries,
});
export type UpdateOrgOutput = v.InferOutput<typeof UpdateOrgOutputSchema>;

export const updateOrg = vg.mutation<UpdateOrgInput, UpdateOrgOutput>(
  'updateOrg',
  UpdateOrgInputSchema,
  UpdateOrgOutputSchema,
);
