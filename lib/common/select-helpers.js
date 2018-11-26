export function licenseToSelect(license) {
  const { licenseType, number } = license;
  return { text: licenseType, value: number };
}

export default {
  licenseToSelect,
};
