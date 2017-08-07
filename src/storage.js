// TODO localstorage should be instead
function read(item) {
  return JSON.parse(localStorage.getItem(item));
}

function write(item, obj) {
  return localStorage.setItem(item, JSON.stringify(obj));
}

function remove(item) {
  return localStorage.removeItem(item);
}

function deleteAll() {
  return localStorage.clear();
}

export default {
  read,
  write,
  remove,
  deleteAll,
};
