import { formIsValid } from 'lib/common/form-helpers';

const mockFormState = {
  errors: {
    taxes: [{ tax_rate: 'is required' }],
  },
};
const mockForm = {
  submitForm: jest.fn().mockReturnValue(() => Promise.resolve()),
  getFormState: jest.fn().mockReturnValue(() => Promise.resolve(mockFormState)),
  values: {
    taxes: [
      {
        tax_name: 'Tax One',
        tax_rate: 2.3,
        tax_type: 'excise',
        license_type: 'medical',
        categories: ['Indica'],
        uuid: 'sdfg',
      },
    ],
  },
};

describe('Form Helpers', async () => {
  it('should create an instance variable for the tax service', async () => {
    const validForm = await formIsValid(mockForm);
    expect(validForm).toEqual(true);
  });
});
