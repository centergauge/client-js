import * as v from 'valibot';

export const NextPageSchema = v.optional(v.string());
export type NextPage = v.InferInput<typeof NextPageSchema>;
