import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {
  ImpactRatingSchema,
  Incident,
  IncidentSchema,
  UrgencyRatingSchema,
} from './incident.mjs';

export const UpdateIncidentPriorityInputSchema = vg.input(
  'UpdateIncidentPriorityInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    impact: ImpactRatingSchema,
    urgency: UrgencyRatingSchema,
  },
);
export type UpdateIncidentPriorityInput = v.InferInput<
  typeof UpdateIncidentPriorityInputSchema
>;

export const updateIncidentPriority = vg.mutation<
  UpdateIncidentPriorityInput,
  Incident
>('updateIncidentPriority', UpdateIncidentPriorityInputSchema, IncidentSchema);
