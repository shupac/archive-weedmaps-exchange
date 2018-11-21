import { addDays, format, subYears } from 'date-fns';
import DAYS, {
  DAYS_OF_THE_WEEK,
  isValidDateOfBirth,
  simpleTimestamp,
  formatDate,
} from './date';

describe('days', () => {
  it('should have all 7 days', () => {
    expect(DAYS).toEqual([
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ]);
  });
  it('should have all 7 days ordered by business requirements', () => {
    expect(DAYS_OF_THE_WEEK).toEqual([
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ]);
  });
});

describe('isValidDateOfBirth()', () => {
  it('should accept a valid date', () => {
    const oldEnoughDate = format(subYears(Date.now(), 19), 'MM/DD/YYYY');
    expect(isValidDateOfBirth(oldEnoughDate)).toBe(true);
  });

  it('should accept 18 years ago', () => {
    const date = format(subYears(Date.now(), 18), 'MM/DD/YYYY');
    expect(isValidDateOfBirth(date)).toBe(true);
  });

  it('should reject 17 years ago', () => {
    const date = format(addDays(subYears(Date.now(), 18), 1), 'MM/DD/YYYY');
    expect(isValidDateOfBirth(date)).toBe(false);
  });

  it('should accept the year 1900', () => {
    expect(isValidDateOfBirth('01/01/1900')).toBe(true);
  });

  it('should reject the year 1899', () => {
    expect(isValidDateOfBirth('12/31/1899')).toBe(false);
  });

  it('should accept the month 12', () => {
    expect(isValidDateOfBirth('12/01/1960')).toBe(true);
  });

  it('should reject the month 13', () => {
    expect(isValidDateOfBirth('13/01/1960')).toBe(false);
  });

  it('should accept the day 31', () => {
    expect(isValidDateOfBirth('05/31/1960')).toBe(true);
  });

  it('should reject the day 32', () => {
    expect(isValidDateOfBirth('05/32/1960')).toBe(false);
  });
});

describe('simpleTimestamp', () => {
  it('should return a formatted timestamp in hours and minutes', () => {
    const constantDate = new Date('1989-06-17T10:20:00');
    const formatted = simpleTimestamp(constantDate);
    expect(formatted).toEqual('10:20 AM');
  });
});

describe('formatDate', () => {
  it('should return a formatted date in month/day/year', () => {
    const dateString = '1989-06-17T10:20:00';
    const formatted = formatDate(dateString);
    expect(formatted).toEqual('06/17/1989');
  });
});
