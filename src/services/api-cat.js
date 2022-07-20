const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'b1dfeea4-d632-4776-b494-723bac3c8eb2';

const fetchData = async (endpoint, options = {}) => {
  const res = await fetch(
    `${BASE_URL}/${endpoint}?api_key=${API_KEY}`,
    options,
  );
  return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
};

const fetchDataPagination = async (
  endpoint,
  limit = null,
  page = null,
  breed_id = '',
  order = '',
  mime_types = '',
  options = {},
) => {
  const queryParams = new URLSearchParams({
    api_key: 'b1dfeea4-d632-4776-b494-723bac3c8eb2',
    limit,
    page,
    breed_id,
    order,
    mime_types,
  });

  const res = await fetch(`${BASE_URL}/${endpoint}?${queryParams}`, options);
  return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
};

const getData = (endpoint, options = {}) => fetchData(endpoint, { ...options });

const getSingleBreed = (
  endpoint,
  limit = null,
  id = '',
  order = '',
  mime_types = '',
  options = {},
) =>
  fetchDataPagination(endpoint, limit, id, order, mime_types, {
    ...options,
  });

const getBreeds = (
  endpoint,
  limit = null,
  page = null,
  id = '',
  order = '',
  mime_types = '',
  options = {},
) =>
  fetchDataPagination(endpoint, limit, page, id, order, mime_types, {
    ...options,
  });

const addVote = (endpoint, data, options = {}) => {
  const finalOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    ...options,
  };
  return fetchData(endpoint, finalOptions);
};

// const editItem = (endpoint, item, options = {}) => {
//   const finalItem = {
//     name: item.name,
//     number: item.number,
//   };
//   console.log('finalItem', finalItem);
//   const finalOptions = {
//     method: 'PATCH',
//     body: JSON.stringify(finalItem),
//     ...options,
//   };
//   console.log('finalOptions.body', finalOptions.body);
//   return fetchData(`${endpoint}/${item.id}`, finalOptions);
// };

// const deleteItem = (endpoint, id, options = {}) =>
//   fetchData(`${endpoint}/${id}`, { method: 'DELETE', ...options });

export {
  getData,
  addVote,
  getBreeds,
  getSingleBreed,
  // editItem,
  // deleteItem
};
