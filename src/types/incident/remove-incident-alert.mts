import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {
  OperationSuccess,
  OperationSuccessSchema,
} from '../operation-success.mjs';

export const RemoveIncidentAlertInputSchema = vg.input(
  'RemoveIncidentAlertInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    alertId: IdSchema,
  },
);
export type RemoveIncidentAlertInput = v.InferInput<
  typeof RemoveIncidentAlertInputSchema
>;

export const removeIncidentAlert = vg.mutation<
  RemoveIncidentAlertInput,
  OperationSuccess
>(
  'removeIncidentAlert',
  RemoveIncidentAlertInputSchema,
  OperationSuccessSchema,
);
