import { Observable } from 'rxjs';
import { URL } from '../constants';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  dataType: 'json',
  'X-Requested-With': 'XMLHttpRequest',
  'X-Mashape-Key': 'abc',
  mode: 'cors',
};

const host = URL.HOST;

const handleSuccessResponse = (resp) => {
  return new Promise((resolve, reject) => {
    console.log('respone', resp);
    resp.json()
      .then((payload) => {
        if (resp && resp.ok) {
          resolve(payload);
        } else {
          reject({ status: resp.status, error: payload });
        }
      })
      .catch((error) => {
        reject({ status: resp.status, error });
      });
  });
};

const handleErrorResponse = (error) => {
  return new Promise((resolve, reject) => {
    reject(error);
  });
};

const xhr = (route, params, verb, isGlobal) => {
  const url = isGlobal ? route : `${host}${route}`;
  const options = Object.assign({
    method: verb,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': verb,
  }, params ?
    { body: JSON.stringify(params) } : null);
  options.headers = headers;
  return Observable.fromPromise(fetch(url, options)
    .then(handleSuccessResponse)
    .catch(handleErrorResponse));
};

const Api = {
  globalGet: (route) => {
    return xhr(route, null, 'GET', true);
  },
  get: (route) => {
    return xhr(route, null, 'GET');
  },
  put: (route, params) => {
    return xhr(route, params, 'PUT');
  },
  post: (route, params) => {
    return xhr(route, params, 'POST');
  },
  patch: (route, params) => {
    return xhr(route, params, 'PATCH');
  },
  delete: (route, params) => {
    return xhr(route, params, 'DELETE');
  },
};

export default Api;
