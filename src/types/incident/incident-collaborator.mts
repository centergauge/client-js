import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';

export const IncidentCollaboratorSchema = vg.type('IncidentCollaborator', {
  id: IdSchema,
  name: v.string(),
  title: v.optional(v.string()),
  email: v.optional(v.pipe(v.string(), v.email())),
  phone: v.optional(v.string()),
});
export type IncidentCollaborator = v.InferOutput<
  typeof IncidentCollaboratorSchema
>;
