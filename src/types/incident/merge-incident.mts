import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Incident, IncidentSchema} from './incident.mjs';

export const MergeIncidentInputSchema = vg.input('MergeIncidentInput', {
  orgId: IdSchema,
  sourceIncidentId: IdSchema,
  targetIncidentId: IdSchema,
});
export type MergeIncidentInput = v.InferInput<typeof MergeIncidentInputSchema>;

export const mergeIncident = vg.mutation<MergeIncidentInput, Incident>(
  'mergeIncident',
  MergeIncidentInputSchema,
  IncidentSchema,
);
