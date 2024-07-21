import * as vg from '../valibot-to-graphql.mjs';
import {Resource, ResourceSchema} from './resource.mjs';
import {ResourceInput, ResourceInputSchema} from './resource-input.mjs';

export const saveResource = vg.mutation<ResourceInput, Resource>(
  'saveResource',
  ResourceInputSchema,
  ResourceSchema,
);
