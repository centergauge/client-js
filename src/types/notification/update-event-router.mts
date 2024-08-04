import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';
import {
  EventRouter,
  EventRouterSchema,
  EventRouterTypeSchema,
} from './event-router.mjs';

export const UpdateEventRouterInputSchema = vg.input('UpdateEventRouterInput', {
  id: IdSchema,
  orgId: IdSchema,
  name: v.string(),
  type: EventRouterTypeSchema,
  webhooks: v.array(IdSchema),
});
export type UpdateEventRouterInput = v.InferInput<
  typeof UpdateEventRouterInputSchema
>;

export const updateEventRouter = vg.mutation<
  UpdateEventRouterInput,
  EventRouter
>('updateEventRouter', UpdateEventRouterInputSchema, EventRouterSchema);
