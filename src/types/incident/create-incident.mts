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

export const CreateIncidentInputSchema = vg.input('CreateIncidentInput', {
  orgId: IdSchema,
  title: v.string(),
  status: IncidentStatusSchema,
  impact: ImpactRatingSchema,
  urgency: UrgencyRatingSchema,
  alerts: v.array(v.string()),
  resources: v.array(v.string()),
  incidentManager: v.optional(IdSchema),
  collaborators: v.array(IdSchema),
});
export type CreateIncidentInput = v.InferInput<
  typeof CreateIncidentInputSchema
>;

export const createIncident = vg.mutation<CreateIncidentInput, Incident>(
  'createIncident',
  CreateIncidentInputSchema,
  IncidentSchema,
);
