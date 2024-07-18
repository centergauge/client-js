import * as vg from '../valibot-to-graphql.mjs';
import {Resource, ResourceSchema} from './resource.mjs';
import {ResourceInput, ResourceInputSchema} from './resource-input.mjs';

export const createResource = vg.mutation<ResourceInput, Resource>(
  'createResource',
  ResourceInputSchema,
  ResourceSchema,
);
