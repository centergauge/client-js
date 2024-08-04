import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {
  EventRouter,
  EventRouterSchema,
  EventRouterTypeSchema,
} from './event-router.mjs';

export const CreateEventRouterInputSchema = vg.input('CreateEventRouter', {
  orgId: IdSchema,
  name: v.string(),
  type: EventRouterTypeSchema,
  webhooks: v.array(IdSchema),
});
export type CreateEventRouterInput = v.InferInput<
  typeof CreateEventRouterInputSchema
>;

export const createEventRouter = vg.mutation<
  CreateEventRouterInput,
  EventRouter
>('createEventRouter', CreateEventRouterInputSchema, EventRouterSchema);
