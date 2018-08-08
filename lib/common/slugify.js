export const slugify = text =>
  text
    .replace(/[^-a-zA-Z0-9\s+]+/gi, '')
    .replace(/\s+/gi, '-')
    .toLowerCase();
export default slugify;
