import noop from 'lodash/noop';
import isPlainObject from 'lodash/isPlainObject';
const baseUrl = 'https://www.reddit.com';
const NETERROR = 999;
const TIMEOUT = 998;

function createError(msg, code) {
  const error = new Error(msg);
  if (code) error.code = code;
  return error;
}
export function buildParams(params) {
  if (!isPlainObject(params)) return;
  return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}
function fetchReddit({ path, after, handleProgress, timeout}) {
  return fetch({
    host: baseUrl,
    path: path + '.json',
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
  const basic = host + path;
  const encodedParams = params && buildParams(params);
  const url = encodedParams ? `${basic}?${encodedParams}` : basic;
  return new Promise(function(resolve, reject) {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.timeout = timeout;
    req.ontimeout = function() {
      reject(createError('网络链接超时，请检查网络或者设置更长的超时时间'), TIMEOUT);
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

export function fetchAllReddits(arr, timeout = 0, handleProgress = noop) {
  const names = arr.map(name => {
    const path = arr === 'Home' ? '/' : '/r/' + name;
    return fetchReddit({ path, timeout, handleProgress });
  });
  return Promise.all(names);
}
export default fetchReddit;
