import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {Finding, FindingSchema} from './finding.mjs';

export const GetFindingArgsSchema = v.object({
  orgId: v.string(),
  id: v.string(),
});
export type GetFindingArgs = v.InferInput<typeof GetFindingArgsSchema>;

export const getFinding = vg.query<GetFindingArgs, Finding>(
  'getFinding',
  GetFindingArgsSchema,
  v.optional(FindingSchema),
);
