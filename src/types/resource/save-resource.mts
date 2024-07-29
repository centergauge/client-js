import * as vg from '../valibot-to-graphql.mjs';
import {
  Resource,
  ResourceInput,
  ResourceInputSchema,
  ResourceSchema,
} from './resource.mjs';

export const saveResource = vg.mutation<ResourceInput, Resource>(
  'saveResource',
  ResourceInputSchema,
  ResourceSchema,
);
