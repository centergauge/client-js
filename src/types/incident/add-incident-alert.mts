import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {
  OperationSuccess,
  OperationSuccessSchema,
} from '../operation-success.mjs';

export const AddIncidentAlertInputSchema = vg.input('AddIncidentAlertInput', {
  orgId: IdSchema,
  incidentId: IdSchema,
  alertId: v.string(),
});
export type AddIncidentAlertInput = v.InferInput<
  typeof AddIncidentAlertInputSchema
>;

export const addIncidentAlert = vg.mutation<
  AddIncidentAlertInput,
  OperationSuccess
>('addIncidentAlert', AddIncidentAlertInputSchema, OperationSuccessSchema);
