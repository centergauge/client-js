import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {RelatedResourceProjectionSchema, RelatedResourceReferenceSchema} from "../resource/index.mjs";

export const FindingSchema = vg.type('Finding', {
  id: v.string(),
  createdAt: v.string(),
  findingType : v.string(),
  title: v.string(),
  description: v.string(),
  accountId: v.string(),
  updatedAt: v.string(),
  severity: v.array(severity),
  region: v.string(),
  resourceId: v.array(resources),
  remediation: v.array(remediation),
  complianceStatus: v.array(compliance)
});
export type Finding = v.InferOutput<typeof FindingSchema>;

export const FindingInputSchema = vg.input('FindingInput', {
  id: v.string(),
  createdAt: v.string(),
  findingType : v.string(),
  title: v.string(),
  description: v.string(),
  accountId: v.string(),
  updatedAt: v.string(),
  severity: v.array(severity),
  region: v.string(),
  resourceId: v.array(resources),
  remediation: v.array(remediation),
  complianceStatus: v.array(compliance)
});

export type FindingInput = v.InferOutput<typeof FindingInputSchema>;
