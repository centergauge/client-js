import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.js';
import {IdentitySchema} from './identity.js';

export const CreateIdentityInputSchema = vg.input('CreateIdentityInput', {
  ...IdentitySchema.entries,
});
export type CreateIdentityInput = v.InferInput<
  typeof CreateIdentityInputSchema
>;

export const CreateIdentityOutputSchema = vg.type('CreateIdentityOutput', {
  ...IdentitySchema.entries,
});
export type CreateIdentityOutput = v.InferOutput<
  typeof CreateIdentityOutputSchema
>;

export const createIdentity = vg.mutation<
  CreateIdentityInput,
  CreateIdentityOutput
>('createIdentity', CreateIdentityInputSchema, CreateIdentityOutputSchema);
