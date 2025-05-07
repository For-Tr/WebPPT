import Cookies from 'js-cookie';

const baseURL = 'http://localhost:5005';

const fetchWithHeaders = (url, options) => {
  let adminInfo;
  if (Cookies.get('adminInfo')) {
    adminInfo = JSON.parse(Cookies.get('adminInfo'));
  }

  let company;
  if (Cookies.get('company')) {
    company = Cookies.get('company');
  }

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: adminInfo ? `Bearer ${adminInfo.token}` : null,
    company: company ? company : null,
  };

  const fetchOptions = {
    ...options,
    headers: new Headers(headers),
  };

  return fetch(`${baseURL}${url}`, fetchOptions).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
};

const requests = {
  get: (url) => fetchWithHeaders(url, { method: 'GET' }),
  
  post: (url, body) => fetchWithHeaders(url, { method: 'POST', body: JSON.stringify(body) }),

  put: (url, body) => fetchWithHeaders(url, { method: 'PUT', body: JSON.stringify(body) }),

  patch: (url, body) => fetchWithHeaders(url, { method: 'PATCH', body: JSON.stringify(body) }),

  delete: (url, body) => fetchWithHeaders(url, { method: 'DELETE', body: JSON.stringify(body) }),
};

export default requests;