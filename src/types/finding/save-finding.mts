import * as vg from '../valibot-to-graphql.mjs';
import {
  Finding,
  FindingInput,
  FindingInputSchema,
  FindingSchema,
} from './finding.mjs';

export const saveFinding = vg.mutation<FindingInput, Finding>(
  'saveFinding',
  FindingInputSchema,
  FindingSchema,
);
