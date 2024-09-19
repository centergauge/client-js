import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {AlertSchema} from './alert.mjs';
import {NextPageSchema, PageLimitSchema} from '../pagination.mjs';
import {IsoDateSchema} from '../dates.mjs';

export const ListAlertArgsSchema = v.object({
  orgId: IdSchema,
  page: NextPageSchema,
  limit: PageLimitSchema,
  start: v.optional(IsoDateSchema),
  end: v.optional(IsoDateSchema),
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
