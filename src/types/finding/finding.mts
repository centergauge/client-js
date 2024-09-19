import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {IdSchema} from '../id.mjs';

export const FindingTypeSchema = v.picklist([
  'aws-security-hub',
  'vigil-prowler',
  'vigil-wiz',
  'aws-trusted-advisor',
  'aws-account-health',
]);

export const FindingSchema = vg.type('Finding', {
  orgId: IdSchema, // Identifies the CenterGauge organization that owns the finding
  id: v.string(), // What does these ID's look like?
  type: FindingTypeSchema, // Identifies the type of the finding
  createdAt: v.string(), // ISO8601 date formatted string
  title: v.string(), // TODO What's the difference between the title and description?
  description: v.string(), // TODO How long can these be?
  accountId: v.string(), // TODO adding account and region makes them AWS specific, we should likely just point to the resource instead
  region: v.string(),
  updatedAt: v.string(), // TODO I'm not sure this is necessary, we should discuss.
  severity: v.array(severity), // TODO You need a pick list
  resourceId: v.array(resources), // TODO What is this?
  remediation: v.array(remediation), // TODO What is this?
  complianceStatus: v.array(compliance), // TODO What is this?
});
export type Finding = v.InferOutput<typeof FindingSchema>;

export const FindingInputSchema = vg.input('FindingInput', {
  id: v.string(),
  createdAt: v.string(),
  findingType: v.string(),
  title: v.string(),
  description: v.string(),
  accountId: v.string(),
  updatedAt: v.string(),
  severity: v.array(severity),
  region: v.string(),
  resourceId: v.array(resources),
  remediation: v.array(remediation),
  complianceStatus: v.array(compliance),
});

export type FindingInput = v.InferOutput<typeof FindingInputSchema>;
