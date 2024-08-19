import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';

export const IncidentManagerSchema = vg.type('IncidentCollaborator', {
  name: v.string(),
  title: v.optional(v.string()),
  email: v.optional(v.pipe(v.string(), v.email())),
  phone: v.optional(v.string()),
});
export type IncidentManager = v.InferOutput<typeof IncidentManagerSchema>;
