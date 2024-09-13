import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {IncidentSchema} from './incident.mjs';
import {NextPageSchema, PageLimitSchema} from '../pagination.mjs';
import {IsoDateSchema} from '../dates.mjs';

export const ListIncidentStatusSchema = v.picklist([
  'active',
  'inactive',
  'open',
  'resolved',
  'cancelled',
  'suppressed',
]);
export type ListIncidentStatus = v.InferOutput<typeof ListIncidentStatusSchema>;

export const ListIncidentArgsSchema = v.object({
  orgId: IdSchema,
  status: v.optional(ListIncidentStatusSchema),
  page: NextPageSchema,
  limit: PageLimitSchema,
  start: v.optional(IsoDateSchema),
  end: v.optional(IsoDateSchema),
});
export type ListIncidentArgs = v.InferInput<typeof ListIncidentArgsSchema>;

export const ListIncidentOutputSchema = vg.type('ListIncidentOutput', {
  items: v.array(IncidentSchema),
  nextPage: NextPageSchema,
});
export type ListIncidentOutput = v.InferOutput<typeof ListIncidentOutputSchema>;

export const listIncident = vg.query<ListIncidentArgs, ListIncidentOutput>(
  'listIncident',
  ListIncidentArgsSchema,
  ListIncidentOutputSchema,
);
