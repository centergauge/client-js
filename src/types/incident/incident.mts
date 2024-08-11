import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {AlertSchema} from '../alert/index.mjs';
import {ResourceSchema} from '../resource/index.mjs';

/**
  Impact: Impact is the measure of the potential damage the incident can cause. It's usually categorized as:

  High: Affects a large number of users, a whole department, or the entire organization. It may also affect critical business processes.
  Medium: Affects several users or disrupts non-critical business processes.
  Low: Affects a single user or a small number of users.
 */
export const ImpactRatingSchema = v.picklist(['high', 'medium', 'low']);
export type ImpactRating = v.InferOutput<typeof ImpactRatingSchema>;

/**
  Urgency: Urgency is the measure of how quickly an incident needs to be resolved. It's usually categorized as:

  High: Needs immediate attention and resolution.
  Medium: Needs to be resolved soon but not immediately.
  Low: Can be resolved in due course.
 */
export const UrgencyRatingSchema = v.picklist(['high', 'medium', 'low']);
export type UrgencyRating = v.InferOutput<typeof UrgencyRatingSchema>;

/**
  Priority: Priority is a calculated measure that combines Impact and Urgency to determine the order in which incidents should be resolved. It's usually categorized as:

  P1 (Critical): High Impact and High Urgency incidents.
  P2 (High): High Impact and Medium Urgency, or Medium Impact and High Urgency incidents.
  P3 (Medium): Medium Impact and Medium Urgency, High Impact and Low Urgency, or Low Impact and High Urgency incidents.
  P4 (Low): Low Impact and Medium Urgency, or Medium Impact and Low Urgency incidents.
  P5 (Very Low): Low Impact and Low Urgency incidents.
 */
export const PriorityRatingSchema = v.picklist(['P1', 'P2', 'P3', 'P4', 'P5']);
export type PriorityRating = v.InferOutput<typeof PriorityRatingSchema>;

/**
 * Status: Status is the current state of the incident. It's usually categorized as:
 *
 * Open: The incident is active and being worked on.
 * Resolved: The incident has been resolved.
 * Cancelled: The incident has been cancelled.
 * Suppressed: The incident has been suppressed. This keeps the incident Open to collect data but suppresses notifications.
 */
export const IncidentStatusSchema = v.picklist([
  'open',
  'resolved',
  'cancelled',
  'suppressed',
]);
export type IncidentStatus = v.InferOutput<typeof IncidentStatusSchema>;

export const IncidentSchema = vg.type('Incident', {
  id: IdSchema,
  orgId: IdSchema,
  orgName: v.string(),
  title: v.string(),
  incidentManager: v.string(),
  status: IncidentStatusSchema,
  impact: ImpactRatingSchema,
  urgency: UrgencyRatingSchema,
  priority: PriorityRatingSchema,
  alerts: v.array(AlertSchema),
  resources: v.array(ResourceSchema),
  createdAt: v.number(),
});
export type Incident = v.InferOutput<typeof IncidentSchema>;

export function isIncident(o: unknown): o is Incident {
  return v.safeParse(IncidentSchema, o).success;
}
