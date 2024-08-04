import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';

export const IdentityAutoMappingSchema = vg.type('IdentityAutoMapping', {
  orgId: IdSchema,
  domain: v.pipe(v.string(), v.maxLength(253)),
});

export type IdentityAutoMapping = v.InferOutput<
  typeof IdentityAutoMappingSchema
>;
