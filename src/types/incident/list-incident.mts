import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {IncidentSchema} from './incident.mjs';
import {PageTokenSchema, PageLimitSchema} from '../pagination.mjs';
import {IsoDateSchema} from '../dates.mjs';
import {ResourceIdSchema} from '../resource/index.mjs';

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
  alertId: v.optional(IdSchema),
  resourceId: v.optional(ResourceIdSchema),
  collaboratorEmail: v.optional(v.string()),
  start: v.optional(IsoDateSchema),
  end: v.optional(IsoDateSchema),
  limit: PageLimitSchema,
  page: PageTokenSchema,
});
export type ListIncidentArgs = v.InferInput<typeof ListIncidentArgsSchema>;

export const ListIncidentOutputSchema = vg.type('ListIncidentOutput', {
  items: v.array(IncidentSchema),
  nextPage: PageTokenSchema,
});
export type ListIncidentOutput = v.InferOutput<typeof ListIncidentOutputSchema>;

export const listIncident = vg.query<ListIncidentArgs, ListIncidentOutput>(
  'listIncident',
  ListIncidentArgsSchema,
  ListIncidentOutputSchema,
);
