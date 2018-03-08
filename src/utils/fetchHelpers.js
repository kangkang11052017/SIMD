import HttpStatus from 'http-status';

const fetchStatus = (url, options = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url, { ...options, mode: 'cors' });
      if (res.ok) {
        if (res.status === 204) {
          resolve(null);
        } else {
          const data = await res.json();
          resolve(data);
        }
      } else if (res.status === HttpStatus.NOT_FOUND) {
        reject({ status: res.status });
      } else {
        const error = await res.json();
        reject({ status: res.status, error });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAsync = (url, options = {}) => { return fetchStatus(url, { ...options, method: 'GET' }); };
const postAsync = (url, body, options = {}) => { return fetchStatus(url, { ...options, method: 'POST', body }); };
const putAsync = (url, body, options = {}) => { return fetchStatus(url, { ...options, method: 'PUT', body }); };
const patchAsync = (url, body, options = {}) => { return fetchStatus(url, { ...options, method: 'PATCH', body }); };
const deleteAsync = (url, body, options = {}) => {
  return fetchStatus(url, { ...options, method: 'DELETE', [body ? 'body' : null]: body });
};

export { getAsync, postAsync, putAsync, patchAsync, deleteAsync };
