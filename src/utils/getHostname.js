export const getHostname = (url) => {
  const format = url.replace(/(^\w+:|^)\/\//, '').replace('www.', '');

  return format.indexOf('/') === -1
    ? format
    : format.slice(0, format.indexOf('/'));
};
