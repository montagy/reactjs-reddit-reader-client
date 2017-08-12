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
