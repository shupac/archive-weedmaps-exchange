// @flow
import type { ReactWrapper, ShallowWrapper } from 'enzyme';

export const findByTestId = (
  wrapper: ReactWrapper | ShallowWrapper,
  testId: string,
): ReactWrapper | ShallowWrapper => wrapper.find(`[data-test-id="${testId}"]`);

export default findByTestId;
