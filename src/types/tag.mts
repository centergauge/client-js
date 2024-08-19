import * as v from 'valibot';
import * as vg from './valibot-to-graphql.mjs';

export const TagSchema = vg.type('Tag', {
  key: v.string(),
  value: v.string(),
});
export type Tag = v.InferOutput<typeof TagSchema>;

export function isTag(tag: unknown): tag is Tag {
  return (
    (tag as Tag).key !== undefined && typeof (tag as Tag).value === 'string'
  );
}

export const TagRecordSchema = v.record(v.string(), v.string());
export type TagRecord = v.InferOutput<typeof TagRecordSchema>;

export function tagsToTagRecord(tags: Tag[]): TagRecord {
  return tags.reduce((acc, tag) => {
    acc[tag.key] = tag.value;
    return acc;
  }, {} as TagRecord);
}

export function tagRecordToTags(tagRecord: TagRecord): Tag[] {
  return Object.entries(tagRecord).map(([key, value]) => ({key, value}));
}

export const TagInputSchema = vg.input('TagInput', {
  key: v.string(),
  value: v.string(),
});
export type TagInput = v.InferOutput<typeof TagInputSchema>;

export function tagInputsToTagRecord(tagInputs: TagInput[]): TagRecord {
  return tagInputs.reduce((acc, tagInput) => {
    acc[tagInput.key] = tagInput.value;
    return acc;
  }, {} as TagRecord);
}
