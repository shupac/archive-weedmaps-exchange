import type { JestMockT } from 'jest';

export default function mock(mockFn) {
  return ((mockFn: any): JestMockT);
}
