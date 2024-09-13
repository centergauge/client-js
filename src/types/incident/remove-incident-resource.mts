import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {
  OperationSuccess,
  OperationSuccessSchema,
} from '../operation-success.mjs';

export const RemoveIncidentResourceInputSchema = vg.input(
  'RemoveIncidentResourceInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    resourceId: v.string(),
  },
);
export type RemoveIncidentResourceInput = v.InferInput<
  typeof RemoveIncidentResourceInputSchema
>;

export const removeIncidentResource = vg.mutation<
  RemoveIncidentResourceInput,
  OperationSuccess
>(
  'removeIncidentResource',
  RemoveIncidentResourceInputSchema,
  OperationSuccessSchema,
);
