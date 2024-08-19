import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdentitySchema} from './identity.mjs';

export const UpdateIdentityInputSchema = vg.input('UpdateIdentityInput', {
  ...IdentitySchema.entries,
});

export type UpdateIdentityInput = v.InferInput<
  typeof UpdateIdentityInputSchema
>;

export const UpdateIdentityOutputSchema = vg.type('UpdateIdentityOutput', {
  ...IdentitySchema.entries,
});
export type UpdateIdentityOutput = v.InferOutput<
  typeof UpdateIdentityOutputSchema
>;

export const updateIdentity = vg.mutation<
  UpdateIdentityInput,
  UpdateIdentityOutput
>('updateIdentity', UpdateIdentityInputSchema, UpdateIdentityOutputSchema);
