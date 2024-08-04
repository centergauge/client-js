import * as v from 'valibot';

export const EventTransformerSchema = v.picklist(['raw', 'record', 'slack']);
export type EventTransformer = v.InferOutput<typeof EventTransformerSchema>;
