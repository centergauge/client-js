import * as v from 'valibot';

export const ResourceCategorySchema = v.picklist(['aws']);
export type ResourceCategory = v.InferOutput<typeof ResourceCategorySchema>;
