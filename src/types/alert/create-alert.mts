import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {Alert, AlertSchema} from './alert.mjs';
import {RelationInputSchema} from '../resource/index.mjs';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {id, orgName, relations, ...entries} = AlertSchema.entries;
export const CreateAlertInputSchema = vg.input('CreateAlertInput', {
  ...entries,
  relations: v.array(RelationInputSchema),
});
export type CreateAlertInput = v.InferInput<typeof CreateAlertInputSchema>;

export const createAlert = vg.mutation<CreateAlertInput, Alert>(
  'createAlert',
  CreateAlertInputSchema,
  AlertSchema,
);
