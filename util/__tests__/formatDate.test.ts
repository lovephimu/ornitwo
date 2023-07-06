import { expect, test } from '@jest/globals';
import { formatDate } from '../../app/functions/formatDate';

test('formats time objects into a d/m/yy string', () => {
  const testDate = new Date(2023, 6, 7);

  expect(formatDate(testDate)).toStrictEqual('7.7.23');
});
