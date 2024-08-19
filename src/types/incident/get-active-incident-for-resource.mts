import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Incident, IncidentSchema} from './incident.mjs';

export const GetActiveIncidentForResourceArgsSchema = v.object({
  orgId: IdSchema,
  resourceId: v.string(),
});
export type GetActiveIncidentForResourceArgs = v.InferInput<
  typeof GetActiveIncidentForResourceArgsSchema
>;

export const getActiveIncidentForResource = vg.query<
  GetActiveIncidentForResourceArgs,
  Incident
>(
  'getActiveIncidentForResource',
  GetActiveIncidentForResourceArgsSchema,
  v.optional(IncidentSchema),
);
