import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';

export const GetActiveIncidentForResourceArgsSchema = v.object({
  orgId: IdSchema,
  resourceId: v.string(),
});
export type GetActiveIncidentForResourceArgs = v.InferInput<
  typeof GetActiveIncidentForResourceArgsSchema
>;

export const GetActiveIncidentForResourceOutputSchema = vg.type(
  'GetActiveIncidentForResourceOutput',
  {
    id: v.string(),
    incidentId: IdSchema,
    orgId: IdSchema,
  },
);
export type GetActiveIncidentForResourceOutput = v.InferOutput<
  typeof GetActiveIncidentForResourceOutputSchema
>;

export const getActiveIncidentForResource = vg.query<
  GetActiveIncidentForResourceArgs,
  GetActiveIncidentForResourceOutput
>(
  'getActiveIncidentForResource',
  GetActiveIncidentForResourceArgsSchema,
  v.optional(GetActiveIncidentForResourceOutputSchema),
);
