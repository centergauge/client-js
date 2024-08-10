import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {
  ImpactRatingSchema,
  Incident,
  IncidentSchema,
  IncidentStatusSchema,
  UrgencyRatingSchema,
} from './incident.mjs';
import {RelatedResourceInputSchema} from '../resource/index.mjs';

export const CreateIncidentInputSchema = vg.input('CreateIncidentInput', {
  orgId: IdSchema,
  title: v.string(),
  incidentManager: v.string(),
  status: IncidentStatusSchema,
  impact: ImpactRatingSchema,
  urgency: UrgencyRatingSchema,
  alerts: v.array(v.string()),
  relations: v.array(RelatedResourceInputSchema),
  project: v.boolean(),
});
export type CreateIncidentInput = v.InferInput<
  typeof CreateIncidentInputSchema
>;

export const createIncident = vg.mutation<CreateIncidentInput, Incident>(
  'createIncident',
  CreateIncidentInputSchema,
  IncidentSchema,
);
