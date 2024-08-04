import * as v from 'valibot';
import * as vg from '../valibot-to-graphql.mjs';
import {
  isProperty,
  propertiesToPropertyRecord,
  PropertyInputSchema,
  PropertyRecordSchema,
  PropertySchema,
  propertyRecordToProperties,
} from '../property.mjs';
import {
  isTag,
  TagInputSchema,
  TagRecordSchema,
  tagRecordToTags,
  TagSchema,
  tagsToTagRecord,
} from '../tag.mjs';
import {IdSchema} from '../id.mjs';

export const RelationTypeSchema = v.picklist([
  'created',
  'createdBy',
  'memberOf',
  'member',
  'contains',
  'containedIn',
  'uses',
  'usedBy',
  'parentOf',
  'childOf',
  'relatesTo',
  'observes',
  'observedBy',
]);
export type RelationType = v.InferOutput<typeof RelationTypeSchema>;

export const RelatedResourceReferenceSchema = vg.type(
  'RelatedResourceReference',
  {
    relationType: RelationTypeSchema,
    id: v.string(),
    __typename: v.literal('RelatedResourceReference'),
  },
);
export type RelatedResourceReference = v.InferOutput<
  typeof RelatedResourceReferenceSchema
>;

export function isRelatedResourceReference(
  o: unknown,
): o is RelatedResourceReference {
  if (!o) {
    return false;
  }
  const r = o as Partial<RelatedResourceReference>;
  return typeof r.id === 'string' && typeof r.relationType === 'string';
}

export const RelatedResourceProjectionSchema = vg.type(
  'RelatedResourceProjection',
  {
    id: v.string(),
    relationType: RelationTypeSchema,
    properties: v.array(PropertySchema),
    tags: v.array(TagSchema),
    relations: v.array(RelatedResourceReferenceSchema),
    createdAt: v.string(),
    updatedAt: v.string(),
    __typename: v.literal('RelatedResourceProjection'),
  },
);
export type RelatedResourceProjection = v.InferOutput<
  typeof RelatedResourceProjectionSchema
>;

export function isRelatedResourceProjection(
  o: unknown,
): o is RelatedResourceProjection {
  if (!o) {
    return false;
  }
  const p = o as Partial<RelatedResourceProjection>;
  return (
    typeof p.id === 'string' &&
    typeof p.relationType === 'string' &&
    Array.isArray(p.properties) &&
    p.properties.every((property: unknown) => isProperty(property)) &&
    Array.isArray(p.tags) &&
    p.tags.every((tag: unknown) => isTag(tag)) &&
    Array.isArray(p.relations) &&
    p.relations.every((relation: unknown) =>
      isRelatedResourceReference(relation),
    ) &&
    typeof p.createdAt === 'string' &&
    typeof p.updatedAt === 'string'
  );
}

export const RelatedResourceSchema = vg.union('RelatedResource', [
  RelatedResourceProjectionSchema,
  RelatedResourceReferenceSchema,
]);
export type RelatedResource = v.InferOutput<typeof RelatedResourceSchema>;

export const ResourceSchema = vg.type('Resource', {
  orgId: IdSchema,
  id: v.string(),
  properties: v.array(PropertySchema),
  tags: v.array(TagSchema),
  relations: v.array(RelatedResourceSchema),
  createdAt: v.string(),
  updatedAt: v.string(),
  inputHash: v.string(),
});
export type Resource = v.InferOutput<typeof ResourceSchema>;

export const EventRelatedResourceSchema = vg.type('EventRelatedResource', {
  ...ResourceSchema.entries,
  relationType: RelationTypeSchema,
});
export type EventRelatedResource = v.InferOutput<
  typeof EventRelatedResourceSchema
>;

export function resourceToRelatedResourceProjection(
  relationType: RelationType,
  resource: Resource,
): RelatedResourceProjection {
  return {
    ...resource,
    relationType,
    relations: resource.relations.map((relation) => {
      return {
        id: relation.id,
        relationType: relation.relationType,
        __typename: 'RelatedResourceReference',
      };
    }),
    __typename: 'RelatedResourceProjection',
  };
}

///////////////////////////////////////////////////////////////////////////////
// Resource Input Types
//
// Minimal input types for creating and updating resources. Resources are
// hydrated where possible to include properties and relations when querying.
///////////////////////////////////////////////////////////////////////////////
export const RelatedResourceInputSchema = vg.input('RelatedResourceInput', {
  relationType: RelationTypeSchema,
  id: v.string(),
});
export type RelatedResourceInput = v.InferInput<
  typeof RelatedResourceInputSchema
>;

export function isRelatedResourceInput(o: unknown): o is RelatedResourceInput {
  if (!o) {
    return false;
  }
  const r = o as Partial<RelatedResourceInput>;
  return typeof r.id === 'string' && typeof r.relationType === 'string';
}

export const ResourceInputSchema = vg.input('ResourceInput', {
  orgId: IdSchema,
  id: v.string(),
  properties: v.array(PropertyInputSchema),
  tags: v.array(TagInputSchema),
  relations: v.array(RelatedResourceInputSchema),
});
export type ResourceInput = v.InferInput<typeof ResourceInputSchema>;

export function isResourceInput(o: unknown): o is ResourceInput {
  if (!o) {
    return false;
  }
  const r = o as Partial<ResourceInput>;
  return (
    typeof r.orgId === 'string' &&
    typeof r.id === 'string' &&
    Array.isArray(r.properties) &&
    r.properties.every((property: unknown) => isProperty(property)) &&
    // TODO
    Array.isArray(r.relations) &&
    r.relations.every((relation: unknown) => isRelatedResourceInput(relation))
  );
}

///////////////////////////////////////////////////////////////////////////////
// Resource Record Types
//
// The following types are more suitable for working in TypeScript, but due to
// limitations with GraphQL, could not be first class citizens. Helper methods
// to convert between these types and the GraphQL types are provided.
///////////////////////////////////////////////////////////////////////////////
export const RelatedResourceReferenceRecordSchema = v.record(
  RelationTypeSchema,
  v.array(v.string()),
);
export type RelatedResourceReferenceRecord = v.InferOutput<
  typeof RelatedResourceReferenceRecordSchema
>;

export function toRelatedResourceReferenceRecord(
  relations: RelatedResourceReference[],
): RelatedResourceReferenceRecord {
  const record: RelatedResourceReferenceRecord = {};
  relations.forEach((relation) => {
    let array = record[relation.relationType];
    if (!array) {
      array = [];
      record[relation.relationType] = array;
    }
    array.push(relation.id);
  });
  return record;
}

export function fromRelatedResourceReferenceRecord(
  record: RelatedResourceReferenceRecord,
): RelatedResourceReference[] {
  const relations: RelatedResourceReference[] = [];
  for (const relationType in record) {
    const ids = record[relationType as RelationType];
    if (ids) {
      for (const id of ids) {
        relations.push({
          id,
          relationType: relationType as RelationType,
          __typename: 'RelatedResourceReference',
        });
      }
    }
  }
  return relations;
}

export const RelatedResourceProjectionRecordValueSchema = v.object({
  id: v.string(),
  properties: PropertyRecordSchema,
  tags: TagRecordSchema,
  relations: RelatedResourceReferenceRecordSchema,
  createdAt: v.string(),
  updatedAt: v.string(),
});
export type RelatedResourceProjectionRecordValue = v.InferOutput<
  typeof RelatedResourceProjectionRecordValueSchema
>;

export function toRelatedResourceProjectionRecordValue(
  relation: RelatedResourceProjection,
): RelatedResourceProjectionRecordValue {
  return {
    id: relation.id,
    properties: propertiesToPropertyRecord(relation.properties),
    tags: tagsToTagRecord(relation.tags),
    relations: toRelatedResourceReferenceRecord(relation.relations),
    createdAt: relation.createdAt,
    updatedAt: relation.updatedAt,
  };
}

export function fromRelatedResourceProjectionRecordValue(
  relationType: RelationType,
  value: RelatedResourceProjectionRecordValue,
): RelatedResourceProjection {
  return {
    id: value.id,
    relationType,
    properties: propertyRecordToProperties(value.properties),
    tags: tagRecordToTags(value.tags),
    relations: fromRelatedResourceReferenceRecord(value.relations),
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
    __typename: 'RelatedResourceProjection',
  };
}

export const RelatedResourceProjectionRecordSchema = v.record(
  RelationTypeSchema,
  v.array(RelatedResourceProjectionRecordValueSchema),
);
export type RelatedResourceProjectionRecord = v.InferOutput<
  typeof RelatedResourceProjectionRecordSchema
>;

export function toRelatedResourceProjectionRecord(
  relations: RelatedResourceProjection[],
): RelatedResourceProjectionRecord {
  const record: RelatedResourceProjectionRecord = {};
  relations.forEach((relation) => {
    if (!record[relation.relationType]) {
      record[relation.relationType] = [];
    }
    record[relation.relationType]!.push(
      toRelatedResourceProjectionRecordValue(relation),
    );
  });
  return record;
}

export function fromRelatedResourceProjectRecord(
  record: RelatedResourceProjectionRecord,
): RelatedResourceProjection[] {
  const relations: RelatedResourceProjection[] = [];
  for (const relationType in record) {
    const values = record[relationType as RelationType];
    if (Array.isArray(values)) {
      values.forEach((value) => {
        relations.push(
          fromRelatedResourceProjectionRecordValue(
            relationType as RelationType,
            value,
          ),
        );
      });
    }
  }
  return relations;
}

export const RelatedResourceRecordSchema = v.record(
  RelationTypeSchema,
  v.array(v.union([v.string(), RelatedResourceProjectionRecordValueSchema])),
);
export type RelatedResourceRecord = v.InferOutput<
  typeof RelatedResourceRecordSchema
>;

export function toRelatedResourceRecord(
  resource: RelatedResource[],
): RelatedResourceRecord {
  const record: RelatedResourceRecord = {};
  resource.forEach((relation) => {
    const relationType = relation.relationType;
    if (!record[relationType]) {
      record[relationType] = [];
    }
    if (isRelatedResourceProjection(relation)) {
      record[relationType]!.push(
        toRelatedResourceProjectionRecordValue(relation),
      );
    } else {
      record[relationType]!.push(relation.id);
    }
  });
  return record;
}

export function fromRelatedResourceRecord(
  record: RelatedResourceRecord,
): RelatedResource[] {
  const relations: RelatedResource[] = [];
  for (const relationType in record) {
    const values = record[relationType as RelationType];
    if (Array.isArray(values)) {
      values.forEach((value) => {
        if (typeof value === 'string') {
          relations.push({
            id: value,
            relationType: relationType as RelationType,
            __typename: 'RelatedResourceReference',
          });
        } else {
          relations.push(
            fromRelatedResourceProjectionRecordValue(
              relationType as RelationType,
              value,
            ),
          );
        }
      });
    }
  }
  return relations;
}

export const ResourceRecordSchema = v.object({
  orgId: IdSchema,
  id: v.string(),
  properties: PropertyRecordSchema,
  tags: TagRecordSchema,
  relations: RelatedResourceRecordSchema,
  createdAt: v.string(),
  updatedAt: v.string(),
  inputHash: v.string(),
});
export type ResourceRecord = v.InferOutput<typeof ResourceRecordSchema>;

export function toResourceRecord(resource: Resource): ResourceRecord {
  return {
    orgId: resource.orgId,
    id: resource.id,
    properties: propertiesToPropertyRecord(resource.properties),
    tags: tagsToTagRecord(resource.tags),
    relations: toRelatedResourceRecord(resource.relations),
    createdAt: resource.createdAt,
    updatedAt: resource.updatedAt,
    inputHash: resource.inputHash,
  };
}

export function fromResourceRecord(record: ResourceRecord): Resource {
  return {
    orgId: record.orgId,
    id: record.id,
    properties: propertyRecordToProperties(record.properties),
    tags: tagRecordToTags(record.tags),
    relations: fromRelatedResourceRecord(record.relations),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    inputHash: record.inputHash,
  };
}

export const RelatedResourceInputRecordSchema = v.record(
  RelationTypeSchema,
  v.array(v.string()),
);
export type RelatedResourceInputRecord = v.InferOutput<
  typeof RelatedResourceInputRecordSchema
>;

export function toRelatedResourceInputRecord(
  relations: RelatedResourceInput[],
): RelatedResourceInputRecord {
  const record: RelatedResourceInputRecord = {};
  for (const relation of relations) {
    let array = record[relation.relationType];
    if (!array) {
      array = [];
      record[relation.relationType] = array;
    }
    array.push(relation.id);
  }
  return record;
}
