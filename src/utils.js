export function htmlDecode(input) {
  const e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
}
//TODO no need at end,if there has footer under container,at end is not possible
export function isScrollAtEnd() {
  return (
    window.innerHeight ===
      document.body.scrollHeight - document.body.scrollTop &&
    document.body.scrollTop > 0
  );
}

export function scrollToEnd() {
  document.body.scrollTop = document.body.scrollHeight;
}

export function hoursAgo(timestamp) {
  const now = new Date();
  const hour = 60 * 60 * 1000;
  const lengthDiff = String(now).length - String(timestamp).length;
  if (lengthDiff > 0) {
    timestamp = Number(String(timestamp) + repeat('0', lengthDiff));
  }
  return Math.floor((now - timestamp) / hour);
}

function repeat(str, num) {
  return Array(num + 1).join(str);
}
