export default class LocalStorage {
  constructor() {}

  set(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  get(name) {
    const data = JSON.parse(localStorage.getItem(name));
    return data;
  }
}