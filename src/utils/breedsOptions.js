export const getBreedsOptions = (data, initialValue) => {
  let breeds = data.map(({ name, id }) => {
    return { label: name, value: name, id };
  });
  const breedsOptions = [initialValue, ...breeds];
  return breedsOptions;
};
