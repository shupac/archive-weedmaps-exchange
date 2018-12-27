export function removeUndefinedProperties(object) {
  return Object.keys(object).reduce((acc, key) => {
    let value = object[key];
    if (value === undefined) return acc;

    if (!Array.isArray(value) && Object(value) === value)
      value = removeUndefinedProperties(value);

    return {
      ...acc,
      [key]: value,
    };
  }, {});
}

export default {};
