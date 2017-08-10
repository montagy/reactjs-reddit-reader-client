const fetchReddit = (path, after) => {
  const basic = `https://www.reddit.com${path}.json`;
  const url = after ? `${basic}?after=${after}` : basic;
  return fetch(url).then(res => res.json());
}
export default fetchReddit;
