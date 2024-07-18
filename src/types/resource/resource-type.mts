import * as v from 'valibot';

export const ResourceTypeSchema = v.picklist(['Account', 'Alarm']);
export type ResourceType = v.InferOutput<typeof ResourceTypeSchema>;
