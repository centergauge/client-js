import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {NextPageSchema} from '../next-page.mjs';

export const ListIncidentResourceArgsSchema = v.object({
  orgId: IdSchema,
  incidentId: IdSchema,
  limit: v.optional(v.number()),
  page: NextPageSchema,
});
export type ListIncidentResourceArgs = v.InferInput<
  typeof ListIncidentResourceArgsSchema
>;

export const ListIncidentResourceOutputSchema = vg.type(
  'ListIncidentResourceOutput',
  {
    items: v.array(IdSchema),
    nextPage: NextPageSchema,
  },
);
export type ListIncidentResourceOutput = v.InferOutput<
  typeof ListIncidentResourceOutputSchema
>;
