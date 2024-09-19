import * as v from 'valibot';

export const NextPageSchema = v.optional(v.string());
export type NextPage = v.InferInput<typeof NextPageSchema>;

export const PageLimitSchema = v.optional(v.pipe(v.number(), v.minValue(1)));
export type PageLimit = v.InferInput<typeof PageLimitSchema>;
