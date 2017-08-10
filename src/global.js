const global = (() => {
  let __storage;
  return {
    get storage() {
      return __storage;
    },
    set storage(s) {
      __storage = s;
    },
  };
})();
export default global;
