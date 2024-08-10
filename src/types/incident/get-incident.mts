import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Incident, IncidentSchema} from './incident.mjs';

export const GetIncidentArgsSchema = v.object({
  id: IdSchema,
  project: v.boolean(),
});
export type GetIncidentArgs = v.InferInput<typeof GetIncidentArgsSchema>;

export const getIncident = vg.query<GetIncidentArgs, Incident>(
  'getIncident',
  GetIncidentArgsSchema,
  v.optional(IncidentSchema),
);
