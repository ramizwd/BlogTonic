export const fetchGql = async (url, query, variables, token) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await res.json();

  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  return data.data;
};
