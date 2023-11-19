class LocalStorageStore {
  getItem = (name: string) => {
    return localStorage.getItem(name);
  };

  setItem = (name: string, data: string) => {
    return localStorage.setItem(name, data);
  };

  clearItem = (name: string) => {
    return localStorage.removeItem(name);
  };
}

const LocalStorage = new LocalStorageStore();

export default LocalStorage;
