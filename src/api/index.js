import noop from 'lodash/noop';
import isPlainObject from 'lodash/isPlainObject';
const baseUrl = 'https://www.reddit.com/';
const NETERROR = 999;
const TIMEOUT = 998;

function createError(msg, code) {
  const error = new Error(msg);
  if (code) error.code = code;
  return error;
}
export function buildParams(params) {
  if (!isPlainObject(params)) return '';
  let result = [];
  for (let key in params) {
    if (params.hasOwnProperty(key) && params[key])
      result.push(key + '=' + params[key]);
  }
  return result.join('&');
}
function fetchReddit({ pathPiece, after, handleProgress, timeout }) {
  return fetch({
    host: baseUrl,
    path: pathPiece.filter(r => r.trim).join('/') + '.json',
    params: { after },
    handleProgress,
    timeout,
  });
}
/**
  *Convenient fetch build on XMLHttpRequest
  *@param {Object} config litral object. Include method, host,
  *path, params,timeout,handleProgress
  *return {Promise} resolve when get data, reject when ontimtout,onerror,status >= 300
*/
export function fetch({
  host = '',
  path = '',
  params,
  timeout = 0,
  handleProgress = noop,
}) {
  const encodedParams = buildParams(params);
  const url = `${host}${path}?${encodedParams}`;
  return new Promise(function(resolve, reject) {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.timeout = timeout;
    req.ontimeout = function() {
      reject(createError('网络链接超时，请检查网络或者设置更长的超时时间', TIMEOUT));
    };
    req.onerror = function networkError() {
      reject(createError('网络链接错误', NETERROR));
    };
    req.onprogress = handleProgress;
    req.onreadystatechange = function() {
      if (req.readyState !== 4) return;
      if (req.status >= 200 && req.status < 300) {
        resolve(JSON.parse(req.responseText));
      } else {
        reject(createError('资源不存在或其他网络原因', req.status));
      }
    };
    req.send();
  });
}

/**
  *reddits {Array} Array of string,specify reddit list which you want to fetch
  *timeout {Number} unit is ms
*/
export function fetchAllReddits(arr, timeout = 0, handleProgress = noop) {
  const names = arr.map(name => {
    const path = arr === 'Home' ? '/' : '/r/' + name;
    return fetchReddit({ path, timeout, handleProgress });
  });
  return Promise.all(names);
}
export default fetchReddit;
/**
  *promises {Array} Array of promise
  *time {Number} unit is ms
*/
export function raceTimeout(promises, timeout) {
  const timer = new Promise((resolve, reject) => {
    setTimeout(function() {
      reject(`timeout: ${timeout}ms`);
    }, timeout);
  });
  promises.push(timer);
  return Promise.race(promises);
}
