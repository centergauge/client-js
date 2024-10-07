import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';

export const PartnerConnectionSchema = vg.type('PartnerConnection', {
  orgId: IdSchema,
  partnerId: IdSchema,
  isAccepted: v.boolean(),
});

export type PartnerConnection = v.InferOutput<typeof PartnerConnectionSchema>;
