class LC {
  static get(key) {
    return localStorage.getItem(key);
  }

  static set(key, value) {
    localStorage.setItem(key, value);
  }

  static remove(key) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }

  static getJSON(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static setJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static removeJSON(key) {
    localStorage.removeItem(key);
  }

  static clearJSON() {
    localStorage.clear();
  }

  static clearAll() {
    localStorage.clear();
  }

  static getKeys() {
    return Object.keys(localStorage);
  }

  static getValues() {
    return Object.values(localStorage);
  }

  static getEntries() {
    return Object.entries(localStorage);
  }

  static getLength() {
    return localStorage.length;
  }

  static isEmpty() {
    return localStorage.length === 0;
  }

  static isNotEmpty() {
    return localStorage.length !== 0;
  }

  static has(key) {
    return localStorage.hasOwnProperty(key);
  }

  static hasValue(value) {
    return Object.values(localStorage).includes(value);
  }

  static hasKey(key) {
    return Object.keys(localStorage).includes(key);
  }
}

export default LC;
