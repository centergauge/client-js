import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {IncidentSchema, IncidentStatusSchema} from './incident.mjs';
import {NextPageSchema} from '../next-page.mjs';

export const ListIncidentArgsSchema = v.object({
  orgId: IdSchema,
  status: v.optional(IncidentStatusSchema),
  page: NextPageSchema,
  limit: v.optional(v.number()),
  start: v.optional(v.string()), // TODO Validate ISO date time format
  end: v.optional(v.string()), // TODO Validate ISO date time format
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
