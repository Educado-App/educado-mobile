import NetInfo from "@react-native-community/netinfo";

export class NetworkStatusService {
  static #instance;
  #isOnline = false;
  #observers = [];

  constructor() {
    if (NetworkStatusService.#instance) {
      throw('NetworkStatusService is a singleton. Use NetworkStatusService.getInstance() instead.');
    }
    this.#initializeNetworkInfo();
    NetworkStatusService.#instance = this;
  }

  static getInstance() {
    if (!this.#instance) {
      this.#instance = new NetworkStatusService();
    }
    return this.#instance;
  }

  addObserver(observer) {
    this.#observers.push(observer);
    return this.#isOnline;
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  #initializeNetworkInfo() {
    NetInfo.addEventListener(state => {
      this.#updateNetworkStatus(state.isConnected);
    });
  }

  #updateNetworkStatus(isOnline) {
    if (this.#isOnline !== isOnline) {
      this.#isOnline = isOnline;
      this.#notifyObservers();
    }
  }

  #notifyObservers() {
    this.#observers.forEach(observer => observer.update(this.#isOnline));
  }

  // Public getter
  get isOnline() {
    return this.#isOnline;
  }
}