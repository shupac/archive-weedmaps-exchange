import { shallow } from 'enzyme';
import FormSaveFooter from './index';

const validationHelper = require('lib/common/form-helpers');

const props = {
  onTogglePreviewDrawer: jest.fn(),
  onSaveForm: jest.fn(() => Promise.resolve({ tax_name: 'Sales' })),
  taxesEnabled: true,
  previewVisible: true,
  taxes: {
    loading: false,
  },
  form: {
    submitForm: jest.fn(() => Promise.resolve(true)),
    getFormState: jest.fn().mockReturnValue({}),
    setFormState: jest.fn(),
    values: {
      taxes: [{ tax_name: 'Excise' }],
    },
  },
};

describe('The Form Save Footer', () => {
  describe(' when the form is invalid', () => {
    beforeEach(() => {
      jest.spyOn(validationHelper, 'formIsValid').mockReturnValue(false);
    });
    it('will not save the form', async () => {
      const component = shallow(<FormSaveFooter {...props} />);
      await component
        .find('Button')
        .last()
        .simulate('click');
      expect(await props.form.setFormState).not.toHaveBeenCalled();
    });
    it('will not toggle the drawer open', async () => {
      const component = shallow(<FormSaveFooter {...props} />);
      await component
        .find('Button')
        .first()
        .simulate('click');
      expect(props.onTogglePreviewDrawer).not.toHaveBeenCalled();
    });
  });
  describe(' when the form is valid', () => {
    beforeEach(() => {
      jest.spyOn(validationHelper, 'formIsValid').mockReturnValue(true);
    });

    it('will render the footer wrapper', () => {
      const component = shallow(<FormSaveFooter {...props} />);
      const footerWrap = component.find('FooterWrapper');
      expect(footerWrap.length).toEqual(1);
    });
    it('will call the onTogglePreviewDrawer', async () => {
      const component = shallow(<FormSaveFooter {...props} />);
      await component
        .find('Button')
        .first()
        .simulate('click');
      expect(props.onTogglePreviewDrawer).toHaveBeenCalled();
    });

    it('will save the form', async () => {
      const component = shallow(<FormSaveFooter {...props} />);
      await component
        .dive()
        .find('LoadingButton')
        .simulate('click');
      expect(await props.form.setFormState).toHaveBeenCalled();
    });
  });
});
