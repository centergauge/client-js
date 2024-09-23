import * as v from 'valibot';

export const PageTokenSchema = v.optional(v.string());
export type PageToken = v.InferInput<typeof PageTokenSchema>;

export const PageLimitSchema = v.optional(v.pipe(v.number(), v.minValue(1)));
export type PageLimit = v.InferInput<typeof PageLimitSchema>;

export const PageNumberSchema = v.pipe(v.number(), v.minValue(1));
export type PageNumber = v.InferInput<typeof PageNumberSchema>;
