const baseUrl = 'https://www.reddit.com';
const NETERROR = 999;
const TIMEOUT = 998;

/*
 *const fetcher = axios.create({
 *  baseURL: 'https://www.reddit.com',
 *  timeout: 20000,
 *});
 */
/*
 *const fetchReddit = (path, after) => {
 *  const basic = `${path}.json`;
 *  const url = after ? `${basic}?after=${after}` : basic;
 *  return fetcher.get(url).then(res => res.data, error => {
 *    console.log(error.code, error.response);
 *    return Promise.reject(new Error('数据不存在或者网络错误。'));
 *  });
 *}
 */
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
        reject(createError('资源不存在', req.status))
      }
    }
    req.send();
  })
}
export default fetchReddit;

/*
 *function fetchAllReddits(arr) {
 *
 *}
 */
