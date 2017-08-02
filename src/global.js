const global = (() => {
  let initialized;
  let storage;
  const init = () => {
    return {
      getStorage: () => storage,
      setStorage: (x) => {
        storage = x;
      },
    };
  };
  return {
    getInstance: () => {
      if (!initialized) {
        initialized = init();
      }
      return initialized;
    },
  };
})();
export default global.getInstance();
