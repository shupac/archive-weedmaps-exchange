import * as Yup from 'yup';

const AllocationSchema = Yup.object().shape({
  zone: Yup.string().required('Zone is required.'),
  price: Yup.string().required('Unit price required.'),
  amount: Yup.string().required('Quantity is required.'),
});

const VariantSchema = Yup.object().shape({
  name: Yup.string().required('Variant name is required.'),
  size: Yup.string().required('Measure is required.'),
  sku: Yup.string().required('SKU is required.'),
  unit: Yup.string().required('Unit type is required.'),
  allocations: Yup.array().of(AllocationSchema),
});

const ProductSchema = Yup.object().shape({
  variants: Yup.array().of(VariantSchema),
});

const SellerProductSchema = Yup.object().shape({
  product: ProductSchema,
  active: Yup.boolean(),
});

export default SellerProductSchema;
