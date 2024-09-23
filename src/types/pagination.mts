import * as v from 'valibot';
import * as vg from './valibot-to-graphql.mjs';

export const PageTokenSchema = v.optional(v.string());
export type PageToken = v.InferInput<typeof PageTokenSchema>;

export const PageLimitSchema = v.optional(v.pipe(v.number(), v.minValue(1)));
export type PageLimit = v.InferInput<typeof PageLimitSchema>;

export const PageNumberSchema = v.pipe(v.number(), v.minValue(1));
export type PageNumber = v.InferInput<typeof PageNumberSchema>;

/**
 * Schema for a page of results.
 */
export const PageSchema = vg.type('Page', {
  /**
   * Token to get the next page of results if one exists.
   */
  next: PageTokenSchema,
  /**
   * Token to get the previous page of results if one exists.
   */
  prev: PageTokenSchema,
  /**
   * The page number of the current page starting with 1.
   */
  num: PageNumberSchema,
});

/**
 * Holds pagination information.
 */
export type Page = v.InferOutput<typeof PageSchema>;
