import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {PageTokenSchema, PageLimitSchema, PageSchema} from '../pagination.mjs';

export const ListIncidentAlertArgsSchema = v.object({
  orgId: IdSchema,
  incidentId: IdSchema,
  limit: PageLimitSchema,
  page: PageTokenSchema,
});
export type ListIncidentAlertArgs = v.InferInput<
  typeof ListIncidentAlertArgsSchema
>;

export const ListIncidentAlertOutputSchema = vg.type(
  'ListIncidentAlertOutput',
  {
    items: v.array(IdSchema),
    page: PageSchema,
  },
);
export type ListIncidentAlertOutput = v.InferOutput<
  typeof ListIncidentAlertOutputSchema
>;

export const listIncidentAlert = vg.query<
  ListIncidentAlertArgs,
  ListIncidentAlertOutput
>(
  'listIncidentAlert',
  ListIncidentAlertArgsSchema,
  ListIncidentAlertOutputSchema,
);
