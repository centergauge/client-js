import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {Resource, ResourceSchema} from './resource.mjs';

export const GetResourceArgsSchema = v.object({id: v.string()});
export type GetResourceArgs = v.InferInput<typeof GetResourceArgsSchema>;

export const getResource = vg.query<GetResourceArgs, Resource>(
  'getResource',
  GetResourceArgsSchema,
  v.optional(ResourceSchema),
);
