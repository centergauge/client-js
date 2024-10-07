import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {PartnerConnectionSchema} from './partner-connection.mjs';

export const CreatePartnerConnectionInputSchema = vg.input(
  'CreatePartnerConnectionInput',
  {
    orgId: IdSchema,
    partnerId: IdSchema,
  },
);
export type CreatePartnerConnectionInput = v.InferInput<
  typeof CreatePartnerConnectionInputSchema
>;

export const CreatePartnerConnectionOutputSchema = vg.type(
  'CreatePartnerConnectionOutput',
  {
    ...PartnerConnectionSchema.entries,
  },
);
export type CreatePartnerConnectionOutput = v.InferOutput<
  typeof CreatePartnerConnectionOutputSchema
>;

export const createPartnerConnection = vg.mutation<
  CreatePartnerConnectionInput,
  CreatePartnerConnectionOutput
>(
  'createPartnerConnection',
  CreatePartnerConnectionInputSchema,
  CreatePartnerConnectionOutputSchema,
);
