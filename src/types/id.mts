import * as v from 'valibot';
import * as vg from './valibot-to-graphql.mjs';

export const IdSchema = v.pipe(vg.id(), v.uuid());
export type Id = v.InferOutput<typeof IdSchema>;
