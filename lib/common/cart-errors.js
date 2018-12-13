const errorDictionary = {
  minimum_purchase:
    'Seller has a minimum order amount. Please update your cart to continue.',
  quantity_unavailable:
    'Some items in your cart no longer have your quantity available. Please update your cart to continue.',
  location_unavailable:
    'Some items in your cart are no longer in stock. Please update your cart to continue.',
  general:
    'There was a problem with your order. Please update your cart to continue.',
};

export const cartErrorMsg = {
  quantity_unavailable: 'Available Quantity:',
  location_unavailable: 'This item is no longer in stock',
  invalid_cart_item: 'Invalid cart item',
  item_not_active: 'Item no longer active',
  deleted_variant: 'Item was removed by seller',
};
export default errorDictionary;
