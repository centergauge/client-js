import * as v from 'valibot';
import * as vg from './valibot-to-graphql.mjs';

export const OperationSuccessSchema = vg.type('OperationSuccess', {
  success: v.boolean(),
});
export type OperationSuccess = v.InferOutput<typeof OperationSuccessSchema>;
