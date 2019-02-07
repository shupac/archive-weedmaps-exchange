// @flow
import React, { Component } from 'react';
import ToggleSwitch from '@ghostgroup/ui.toggle';
import { Router } from 'lib/routes';
import get from 'lodash.get';
import LoadingButton from 'components/atoms/loading-button';
import { ButtonWhiteNoHover } from 'components/atoms/button';
import { type SellerProductType } from 'models/seller-product';
import { type VariantType } from 'models/variant';
import { type ZoneType } from 'models/zone';
import { FieldArray } from 'formik';
import Breadcrumbs from 'components/molecules/breadcrumbs';
import SlideInDrawer, { DrawerHead } from 'components/atoms/slide-drawer';
import ZoneLegend from 'components/molecules/zone-legend';
import uniqueKey from 'lib/common/unique-key';
import VariantCard from './variant-card';

import {
  StyledForm,
  SellerProductWrapper,
  ScrollWrapper,
  Layout,
  ProductName,
  ContentWrapper,
  AvailabilityWrapper,
  AvailabilityHeader,
  VariantHeader,
  VariantInfo,
  AddVariantButton,
  InstructionsWrapper,
  ZonesLink,
  VariantsWrapper,
  Footer,
} from './styles';

type Props = {
  zones: ZoneType[],
  values: SellerProductType,
  errors: Object,
  touched: Object,
  handleChange: mixed => void,
  handleSubmit: mixed => void,
  handleReset: mixed => void,
  handleBlur: (SyntheticEvent<FocusEvent>) => void,
  dirty: boolean,
  isValid: boolean,
  isSubmitting: boolean,
};

type FormData = {
  variants: VariantType[],
  zones: ZoneType[],
  handleBlur: (SyntheticEvent<FocusEvent>) => void,
  errors: Object,
  touched: Object,
};

type ArrayHelpers = {
  push: mixed => void,
  replace: (number, mixed) => void,
  remove: number => void,
};

class Variant {
  id = uniqueKey();
  name = '';
  size = '';
  sku = '';
  unit = '';
  allocations = [];
  isNew = true;
}

type State = {
  drawerOpen: boolean,
};

class ProductForm extends Component<Props, State> {
  state = {
    drawerOpen: false,
  };
  addVariant: () => void;

  constructBreadcrumb = () => {
    const baseCrumb = {
      label: 'Products',
      route: '/seller/products',
    };

    return [baseCrumb];
  };

  onDrawerToggle = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.setState(prevState => ({
      drawerOpen: !prevState.drawerOpen,
    }));
  };

  render() {
    const {
      zones,
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      handleReset,
      handleBlur,
      dirty,
      isValid,
      isSubmitting,
    } = this.props;

    const { product, active } = values;
    const { name, variants } = product;
    const { drawerOpen } = this.state;

    return (
      <StyledForm onKeyDown={e => e.key === 'Enter' && e.preventDefault()}>
        <SellerProductWrapper>
          <ScrollWrapper>
            <Breadcrumbs
              links={this.constructBreadcrumb()}
              activeLabel="Product"
            />
            <SlideInDrawer show={drawerOpen}>
              <DrawerHead onClick={this.onDrawerToggle}>
                <ButtonWhiteNoHover
                  data-test-id="manage-zones-button"
                  w={160}
                  onClick={e => {
                    e.preventDefault();
                    Router.pushRoute('sellerSettings', { tab: 'zones' });
                  }}
                >
                  Manage Zones
                </ButtonWhiteNoHover>
              </DrawerHead>
              <ZoneLegend />
            </SlideInDrawer>
            <ProductName>{name}</ProductName>
            <Layout>
              <ContentWrapper>
                <VariantHeader>Variants</VariantHeader>
                <VariantInfo>
                  Add variants for each version of this product, like different
                  weights or packs. Then you can configure the selling options
                  for each variant and quantity to allocate to each zone.
                </VariantInfo>
                <AddVariantButton
                  type="button"
                  onClick={() => this.addVariant()}
                >
                  Add Variant
                </AddVariantButton>
                <InstructionsWrapper>
                  Modify the variants and zone allocations to be created:
                  <ZonesLink
                    onClick={this.onDrawerToggle}
                    data-test-id="zones-link"
                  >
                    View Zones
                  </ZonesLink>
                </InstructionsWrapper>
                <VariantsWrapper>
                  <FieldArray
                    name="product.variants"
                    render={this.renderVariants({
                      variants,
                      zones,
                      errors: get(errors, ['product', 'variants'], []),
                      touched: get(touched, ['product', 'variants'], []),
                      handleBlur,
                    })}
                  />
                </VariantsWrapper>
              </ContentWrapper>
              <AvailabilityWrapper>
                <AvailabilityHeader>Availability</AvailabilityHeader>
                <p>
                  Once published, buyers can browse and purchase this product in
                  the marketplace.
                </p>
                <div>
                  Publish Product
                  {/* // $FlowFixMe */}
                  <ToggleSwitch
                    hideLabel
                    checked={values.active}
                    onChange={event => {
                      event.target = {
                        value: !active,
                        name: 'active',
                      };
                      handleChange(event);
                    }}
                  />
                </div>
              </AvailabilityWrapper>
            </Layout>
          </ScrollWrapper>
        </SellerProductWrapper>
        {dirty && (
          <Footer>
            Unsaved Changes
            <ButtonWhiteNoHover onClick={handleReset}>
              Discard
            </ButtonWhiteNoHover>
            <LoadingButton
              type="submit"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              disabled={isSubmitting || !isValid}
              loadingText="Saving"
              size={{
                width: '100%',
                height: '40px',
              }}
            >
              Save
            </LoadingButton>
          </Footer>
        )}
      </StyledForm>
    );
  }

  renderVariants = (formData: FormData) => (arrayHelpers: ArrayHelpers) => {
    const { variants, zones, errors, touched, handleBlur } = formData;
    const { push, replace, remove } = arrayHelpers;

    this.addVariant = () => push(new Variant());
    // $FlowFixMe
    return variants.map((variant, i) => (
      <VariantCard
        key={variant.id}
        index={i}
        namePath="product.variants"
        variant={variant}
        zones={zones.map(zone => zone)}
        onUpdate={values => replace(i, { ...variant, ...values })}
        onDelete={() => remove(i)}
        errors={get(errors, [i], {})}
        touched={get(touched, [i], {})}
        handleBlur={handleBlur}
      />
    ));
  };
}

export default ProductForm;
