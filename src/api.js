const baseUrl = 'https://www.reddit.com';
const NETERROR = 999;
const TIMEOUT = 998;

function createError(msg, code) {
  const error = new Error(msg);
  if(code)
    error.code = code;
  return error;
}
function fetchReddit({ path, after, timeout = 0, handleProgress }) {
  const basic = `${baseUrl + path}.json`;
  const url = after ? `${basic}?after=${after}` : basic;
  return new Promise(function(resolve, reject) {
    const req = new XMLHttpRequest();
    req.open('GET', url);
    req.timeout = timeout
    req.ontimeout = function() {
      reject(createError('网络链接超市，请检查网络或者设置更长的超时时间'), TIMEOUT);
    }
    req.onerror = function networkError(){
      reject(createError('网络链接错误', NETERROR));
    }
    req.onprogress = handleProgress || function() {};
    req.onreadystatechange = function() {
      if (req.readyState !== 4) return;
      if (req.status >= 200 && req.status < 300) {
        resolve(JSON.parse(req.responseText));
      }else {
        reject(createError('资源不存在或其他网络原因', req.status))
      }
    }
    req.send();
  })
}
export default fetchReddit;

export function fetchAllReddits(arr, timeout = 0, progress) {
  const handleProgress = progress || function() {};
  const names = arr.map(name => {
    const path = arr === 'Home' ? '/' : '/r/' + name
    return fetchReddit({path, timeout, handleProgress});
  });
  return Promise.all(names);
}
