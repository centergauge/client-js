import * as v from 'valibot';

export const IsoDateSchema = v.pipe(v.string(), v.isoDate());
export type IsoDate = v.InferInput<typeof IsoDateSchema>;

export function isoDateToDate(isoDate: IsoDate): Date {
  return new Date(isoDate);
}

export function isoDateFromNow(): IsoDate {
  return new Date().toISOString();
}

export function isoDateFromDate(date: Date): IsoDate {
  return date.toISOString();
}
