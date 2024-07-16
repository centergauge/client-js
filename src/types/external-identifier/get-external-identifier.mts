import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {
  ExternalIdentifier,
  ExternalIdentifierSchema,
} from './external-identifier.mjs';

export const GetExternalIdentifierArgsSchema = v.object({id: v.string()});
export type GetExternalIdentifierArgs = v.InferInput<
  typeof GetExternalIdentifierArgsSchema
>;

export const getExternalIdentifier = vg.query<
  GetExternalIdentifierArgs,
  ExternalIdentifier
>(
  'getExternalIdentifier',
  GetExternalIdentifierArgsSchema,
  v.optional(ExternalIdentifierSchema),
);
