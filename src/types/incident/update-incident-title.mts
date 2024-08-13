import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Incident, IncidentSchema} from './incident.mjs';

export const UpdateIncidentTitleInputSchema = vg.input(
  'UpdateIncidentTitleInput',
  {
    orgId: IdSchema,
    id: IdSchema,
    title: v.string(),
  },
);
export type UpdateIncidentTitleInput = v.InferInput<
  typeof UpdateIncidentTitleInputSchema
>;

export const updateIncidentTitle = vg.mutation<
  UpdateIncidentTitleInput,
  Incident
>('updateIncidentTitle', UpdateIncidentTitleInputSchema, IncidentSchema);
