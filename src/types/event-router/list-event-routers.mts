import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {EventRouterSchema} from './event-router.mjs';

export const ListEventRouterArgsSchema = v.object({orgId: IdSchema});
export type ListEventRouterArgs = v.InferOutput<
  typeof ListEventRouterArgsSchema
>;

export const ListEventRouterOutputSchema = vg.type('ListEventRouterOutput', {
  items: v.array(EventRouterSchema),
});
export type ListEventRoutersOutput = v.InferOutput<
  typeof ListEventRouterOutputSchema
>;

export const listEventRouter = vg.query<
  ListEventRouterArgs,
  ListEventRoutersOutput
>('listEventRouter', ListEventRouterArgsSchema, ListEventRouterOutputSchema);
