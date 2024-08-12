import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {NextPageSchema} from '../next-page.mjs';
import {AlertSchema} from './alert.mjs';

export const ListAlertArgsSchema = v.object({
  orgId: IdSchema,
  nextPage: NextPageSchema,
  limit: v.optional(v.number()),
  start: v.optional(v.string()),
  end: v.optional(v.string()),
  project: v.boolean(),
});
export type ListAlertArgs = v.InferInput<typeof ListAlertArgsSchema>;

export const ListAlertOutputSchema = vg.type('ListAlertOutput', {
  items: v.array(AlertSchema),
  nextPage: NextPageSchema,
});
export type ListAlertOutput = v.InferOutput<typeof ListAlertOutputSchema>;

export const listAlert = vg.query<ListAlertArgs, ListAlertOutput>(
  'listAlert',
  ListAlertArgsSchema,
  ListAlertOutputSchema,
);
