import * as vg from '../valibot-to-graphql.mjs';
import {Alert, AlertSchema} from './alert.mjs';
import {AlertInput, AlertInputSchema} from './alert-input.mjs';

export const createAlert = vg.mutation<AlertInput, Alert>(
  'createAlert',
  AlertInputSchema,
  AlertSchema,
);
