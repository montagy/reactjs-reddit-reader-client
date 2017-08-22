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
  const now = new Date().getTime();
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

export function hoursToDayAndHour(hours) {
  return {
    day: Math.floor((hours / 24)),
    hour: hours % 24,
  };
}

export function scrollTopSmooth(y, time) {
  const total = document.body.scrollTop;
  if (total) {
    const diff = document.body.scrollTop - y;
    const unit = 17 * diff / time;
    let step = unit, id = null;
    const animation = () => {
      if(diff - step <= unit) {
        document.body.scrollTop = y;
        cancelAnimationFrame(id);
      } else {
        document.body.scrollTop = diff - step;
        step += unit;
        requestAnimationFrame(animation);
      }
    }
    id = requestAnimationFrame(animation);
  }
}
