export function canChangeQuantity(to) {
  return to > 0;
}

export function changeQuantity(by, value, onChange) {
  return () => {
    const newValue = value + by;
    if (canChangeQuantity(newValue)) {
      onChange(newValue);
    }
  };
}
