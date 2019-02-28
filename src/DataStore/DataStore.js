class DataStore {
  get(key) {
    return localStorage.getItem(key);
  }

  set(key, value) {
    localStorage.setItem(key, value);
  }

  delete(key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

export default new DataStore();
