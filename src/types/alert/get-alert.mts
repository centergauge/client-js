import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {Alert, AlertSchema} from './alert.mjs';

export const GetAlertArgsSchema = v.object({
  orgId: IdSchema,
  id: IdSchema,
  project: v.boolean(),
});
export type GetAlertArgs = v.InferInput<typeof GetAlertArgsSchema>;

export const getAlert = vg.query<GetAlertArgs, Alert>(
  'getAlert',
  GetAlertArgsSchema,
  v.optional(AlertSchema),
);
