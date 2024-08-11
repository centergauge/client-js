import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {NextPageSchema} from '../next-page.mjs';
import {AlertSchema} from './alert.mjs';

export const ListAlertArgsSchema = v.object({
  orgId: IdSchema,
  nextPage: NextPageSchema,
  startRange: v.optional(v.number()),
  endRange: v.optional(v.number()),
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
