export function htmlDecode(str) {
  if (str && typeof str === 'string') {
    const e = document.createElement('div');
    e.innerHTML = str;
    str = e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  }
  return str;
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

export function timeAgo(timestamp) {
  const now = new Date().getTime();
  const lengthDiff = String(now).length - String(timestamp).length;
  if (lengthDiff >= 0) {
    timestamp = Number(String(timestamp) + repeat('0', lengthDiff));
    const ago = now - timestamp;
    const mins = ago / (1000 * 60);
    const hours = mins / 60;
    const days = hours / 24;
    return {
      day: Math.floor(days),
      hour: Math.floor(hours) % 24,
      min: Math.floor(mins) % 60,
    };
  }
  throw TypeError('wrong length of timestamp,must shorter than now.');
}
export function hoursAgo(timestamp) {
  const result = timeAgo(timestamp);
  return result.day * 24 + result.hour;
}

function repeat(str, num) {
  return Array(num + 1).join(str);
}

export function scrollTopSmooth(y, time) {
  const total = document.body.scrollTop;
  if (total) {
    const diff = document.body.scrollTop - y;
    const unit = 17 * diff / time;
    let step = unit,
      id = null;
    const animation = () => {
      if (diff - step <= unit) {
        document.body.scrollTop = y;
        cancelAnimationFrame(id);
      } else {
        document.body.scrollTop = diff - step;
        step += unit;
        requestAnimationFrame(animation);
      }
    };
    id = requestAnimationFrame(animation);
  }
}
