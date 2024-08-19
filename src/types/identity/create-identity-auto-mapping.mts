import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdentityAutoMappingSchema} from './identity-auto-mapping.mjs';

export const CreateIdentityAutoMappingInputSchema = vg.input(
  'CreateIdentityAutoMapping',
  {
    ...IdentityAutoMappingSchema.entries,
  },
);
export type CreateIdentityAutoMappingInput = v.InferInput<
  typeof CreateIdentityAutoMappingInputSchema
>;

export const CreateIdentityAutoMappingOutputSchema = vg.type(
  'CreateIdentityAutoMappingOutput',
  {
    ...IdentityAutoMappingSchema.entries,
  },
);
export type CreateIdentityAutoMappingOutput = v.InferOutput<
  typeof CreateIdentityAutoMappingOutputSchema
>;

export const createIdentityAutoMapping = vg.mutation<
  CreateIdentityAutoMappingInput,
  CreateIdentityAutoMappingOutput
>(
  'createIdentityAutoMapping',
  CreateIdentityAutoMappingInputSchema,
  CreateIdentityAutoMappingOutputSchema,
);
