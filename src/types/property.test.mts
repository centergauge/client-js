import {test, expect} from 'vitest';
import {
  fromProperty,
  isBooleanProperty,
  isFloat,
  isFloatProperty,
  isInteger,
  isIntegerProperty,
  isStringArrayProperty,
  isStringProperty,
  propertyInputsToRecord,
  recordToProperties,
  toProperty,
} from './property.mjs';

test('Test isInteger', () => {
  expect(isInteger(1)).toBe(true);
  expect(isInteger(1.1)).toBe(false);
  expect(isInteger('1')).toBe(false);
});

test('Test isFloat', () => {
  expect(isFloat(1)).toBe(false);
  expect(isFloat(1.1)).toBe(true);
  expect(isFloat('1')).toBe(false);
});

test('Test isStringProperty', () => {
  expect(isStringProperty({key: 'key', stringValue: '1'})).toBe(true);
  expect(isStringProperty({key: 'key', stringValue: 1})).toBe(false);
  expect(isStringProperty({key: 'key', stringValue: true})).toBe(false);
  expect(isStringProperty({key: 'key', stringValue: 1.1})).toBe(false);
});

test('Test isStringArrayProperty', () => {
  expect(isStringArrayProperty({key: 'key', stringValues: ['1', '2']})).toBe(
    true,
  );
  expect(isStringArrayProperty({key: 'key', stringValues: ['1', 2]})).toBe(
    false,
  );
  expect(isStringArrayProperty({key: 'key', stringValues: [1, 2]})).toBe(false);
});

test('Test isBooleanProperty', () => {
  expect(isBooleanProperty({key: 'key', booleanValue: '1'})).toBe(false);
  expect(isBooleanProperty({key: 'key', booleanValue: 1})).toBe(false);
  expect(isBooleanProperty({key: 'key', booleanValue: true})).toBe(true);
  expect(isBooleanProperty({key: 'key', booleanValue: 1.1})).toBe(false);
});

test('Test isIntegerProperty', () => {
  expect(isIntegerProperty({key: 'key', integerValue: '1'})).toBe(false);
  expect(isIntegerProperty({key: 'key', integerValue: 1})).toBe(true);
  expect(isIntegerProperty({key: 'key', integerValue: true})).toBe(false);
  expect(isIntegerProperty({key: 'key', integerValue: 1.1})).toBe(false);
});

test('Test isFloatProperty', () => {
  expect(isFloatProperty({key: 'key', floatValue: '1'})).toBe(false);
  expect(isFloatProperty({key: 'key', floatValue: 1})).toBe(false);
  expect(isFloatProperty({key: 'key', floatValue: true})).toBe(false);
  expect(isFloatProperty({key: 'key', floatValue: 1.1})).toBe(true);
});

test('Test toProperty', () => {
  const prop1 = toProperty({key: 'key', value: '1', type: 'integer'});
  expect(isIntegerProperty(prop1)).toBe(true);
  const prop2 = toProperty({key: 'key', value: '1.1', type: 'float'});
  expect(isFloatProperty(prop2)).toBe(true);
  const prop3 = toProperty({key: 'key', value: 'true', type: 'boolean'});
  expect(isBooleanProperty(prop3)).toBe(true);
  const prop4 = toProperty({key: 'key', value: 'value', type: 'string'});
  expect(isStringProperty(prop4)).toBe(true);
  const prop5 = toProperty({key: 'key', value: 'a,b', type: 'string[]'});
  expect(isStringArrayProperty(prop5)).toBe(true);
});

test('Test fromProperty', () => {
  const prop1 = fromProperty({key: 'key', integerValue: 1});
  expect(prop1.type).toBe('integer');
  const prop2 = fromProperty({key: 'key', floatValue: 1.1});
  expect(prop2.type).toBe('float');
  const prop3 = fromProperty({key: 'key', booleanValue: true});
  expect(prop3.type).toBe('boolean');
  const prop4 = fromProperty({key: 'key', stringValue: 'value'});
  expect(prop4.type).toBe('string');
  const prop5 = fromProperty({key: 'key', stringValues: ['a', 'b']});
  expect(prop5.type).toBe('string[]');
});

test('Test propertyInputsToRecord', () => {
  const record = propertyInputsToRecord([
    {key: 'stringKey', value: 'str', type: 'string'},
    {key: 'integerKey', value: '1', type: 'integer'},
    {key: 'floatKey', value: '1.1', type: 'float'},
    {key: 'booleanKey', value: 'true', type: 'boolean'},
    {key: 'stringArrayKey', value: 'a,b', type: 'string[]'},
  ]);
  expect(record['stringKey']).toBe('str');
  expect(record['integerKey']).toBe(1);
  expect(record['floatKey']).toBe(1.1);
  expect(record['booleanKey']).toBe(true);
  expect(record['stringArrayKey']).toEqual(['a', 'b']);
});

test('Test recordToProperties', () => {
  const record: Record<string, string | number | boolean | string[]> = {};
  record['stringKey'] = 'str';
  record['integerKey'] = 1;
  record['floatKey'] = 1.1;
  record['booleanKey'] = true;
  record['stringArrayKey'] = ['a', 'b'];
  const properties = recordToProperties(record);
  expect(properties.length).toBe(5);
});
