import * as v from 'valibot';
import {EventSchema} from '../event.mjs';
import {
  ImpactRatingSchema,
  IncidentStatusSchema,
  PriorityRatingSchema,
  UrgencyRatingSchema,
} from './incident.mjs';
import {IncidentManagerSchema} from './incident-manager.mjs';
import {AlertSchema} from '../alert/index.mjs';

export const IncidentOpenedEventSchema = v.object({
  ...EventSchema.entries,
  type: v.string('incident-opened'),
  orgName: v.string(),
  title: v.string(),
  status: IncidentStatusSchema,
  impact: ImpactRatingSchema,
  urgency: UrgencyRatingSchema,
  priority: PriorityRatingSchema,
  incidentManager: v.optional(IncidentManagerSchema),
  firstAlert: v.optional(AlertSchema),
  link: v.string(),
});
export type IncidentOpenedEvent = v.InferOutput<
  typeof IncidentOpenedEventSchema
>;
