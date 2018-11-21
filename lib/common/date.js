import isWithinRange from 'date-fns/is_within_range';
import parse from 'date-fns/parse';
import subYears from 'date-fns/sub_years';
import format from 'date-fns/format';

export default [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export const DAYS_OF_THE_WEEK = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export function isValidDateOfBirth(dateOfBirth) {
  const parsedDob = parse(dateOfBirth);
  const lowerLimit = new Date(1900, 0, 1);
  const upperLimit = subYears(Date.now(), 18);
  return isWithinRange(parsedDob, lowerLimit, upperLimit);
}

export function simpleTimestamp(date) {
  return format(date, 'h:mm A');
}

export function formatDate(dateString) {
  const date = parse(dateString);
  return format(date, 'MM/DD/YYYY');
}
