function Option(id, name, checked) {
  const option = { id, name };
  if (checked !== undefined) option.checked = checked;
  return option;
}

export const categories = [];

for (let i = 1; i < 4; i += 1) {
  const children = [];
  for (let j = 1; j < 6; j += 1) {
    const id = `${i}${j}`;
    const name = `Subcat${j}`;
    children.push(Option(id, name, false));
  }

  const parent = Option(`${i}`, `Category${i}`);

  categories.push({ parent, children });
}

export const availabilities = [
  {
    id: 'inStock',
    name: 'In Stock',
    checked: false,
  },
  {
    id: 'outOfStock',
    name: 'Out of Stock',
    checked: false,
  },
];

export const brands = [];

for (let i = 1; i < 16; i += 1) {
  brands.push(Option(`${i}`, `Brand${i}`, false));
}
