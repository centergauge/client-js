import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {IncidentSchema} from './incident.mjs';

export const ListIncidentArgsSchema = v.object({
  orgId: IdSchema,
  project: v.boolean(),
  page: v.optional(v.string()),
});
export type ListIncidentArgs = v.InferInput<typeof ListIncidentArgsSchema>;

export const ListIncidentOutputSchema = vg.type('ListIncidentOutput', {
  items: v.array(IncidentSchema),
  nextPage: v.optional(v.string()),
});
export type ListIncidentOutput = v.InferOutput<typeof ListIncidentOutputSchema>;

export const listIncident = vg.query<ListIncidentArgs, ListIncidentOutput>(
  'listIncident',
  ListIncidentArgsSchema,
  ListIncidentOutputSchema,
);
