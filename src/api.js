const fetchReddit = (path, resolve, after) => {
  const basic = `https://www.reddit.com${path}.json`;
  const url = after ? `${basic}?after=${after}` : basic;
  return fetch(url).then(res => res.json()).then(resolve).catch(err => {
    throw new Error(err);
  });
}
export default fetchReddit;
