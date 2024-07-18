import * as v from 'valibot';

export const ResourceServiceSchema = v.picklist(['cloudwatch']);
export type ResourceService = v.InferOutput<typeof ResourceServiceSchema>;
