import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {
  OperationSuccess,
  OperationSuccessSchema,
} from '../operation-success.mjs';

export const AddIncidentResourceInputSchema = vg.input(
  'AddIncidentResourceInput',
  {
    orgId: IdSchema,
    incidentId: IdSchema,
    resourceId: v.string(),
  },
);
export type AddIncidentResourceInput = v.InferInput<
  typeof AddIncidentResourceInputSchema
>;

export const addIncidentResource = vg.mutation<
  AddIncidentResourceInput,
  OperationSuccess
>(
  'addIncidentResource',
  AddIncidentResourceInputSchema,
  OperationSuccessSchema,
);
