import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {PartnerConnectionSchema} from './partner-connection.mjs';

export const UpdatePartnerConnectionInputSchema = vg.input(
  'UpdatePartnerConnectionInput',
  {
    orgId: IdSchema,
    partnerId: IdSchema,
    isAccepted: v.boolean(),
  },
);
export type UpdatePartnerConnectionInput = v.InferInput<
  typeof UpdatePartnerConnectionInputSchema
>;

export const UpdatePartnerConnectionOutputSchema = vg.type(
  'UpdatePartnerConnectionOutput',
  {
    ...PartnerConnectionSchema.entries,
  },
);
export type UpdatePartnerConnectionOutput = v.InferOutput<
  typeof UpdatePartnerConnectionOutputSchema
>;

export const updatePartnerConnection = vg.mutation<
  UpdatePartnerConnectionInput,
  UpdatePartnerConnectionOutput
>(
  'updatePartnerConnection',
  UpdatePartnerConnectionInputSchema,
  UpdatePartnerConnectionOutputSchema,
);
