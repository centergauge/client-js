import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {NextPageSchema, PageLimitSchema} from '../pagination.mjs';

export const ListIncidentResourceArgsSchema = v.object({
  orgId: IdSchema,
  incidentId: IdSchema,
  limit: PageLimitSchema,
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

export const listIncidentResource = vg.query<
  ListIncidentResourceArgs,
  ListIncidentResourceOutput
>(
  'listIncidentResource',
  ListIncidentResourceArgsSchema,
  ListIncidentResourceOutputSchema,
);
