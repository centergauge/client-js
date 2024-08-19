import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {Resource, ResourceSchema} from './resource.mjs';
import {IdSchema} from '../id.mjs';

export const GetResourceArgsSchema = v.object({
  orgId: IdSchema,
  id: v.string(),
  project: v.boolean(),
});
export type GetResourceArgs = v.InferInput<typeof GetResourceArgsSchema>;

export const getResource = vg.query<GetResourceArgs, Resource>(
  'getResource',
  GetResourceArgsSchema,
  v.optional(ResourceSchema),
);
