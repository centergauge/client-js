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

export const UpdateIncidentInputSchema = vg.input('UpdateIncidentInput', {
  id: IdSchema,
  orgId: IdSchema,
  title: v.string(),
  incidentManager: v.string(),
  status: IncidentStatusSchema,
  impact: ImpactRatingSchema,
  urgency: UrgencyRatingSchema,
  project: v.boolean(),
});
export type UpdateIncidentInput = v.InferInput<
  typeof UpdateIncidentInputSchema
>;

export const updateIncident = vg.mutation<UpdateIncidentInput, Incident>(
  'updateIncident',
  UpdateIncidentInputSchema,
  IncidentSchema,
);
