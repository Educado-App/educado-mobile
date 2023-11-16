import io from 'socket.io-client';

export class NetworkStatusService {
  static instance;
  #isOnline = false;
  observers = [];

  constructor(ip) {
    this.initializeWebSocket(ip);
    if (NetworkStatusService.instance != null) {
      throw('NetworkStatusService is a singleton. Use NetworkStatusService.getInstance() instead.');
    }
  }

  static getInstance() {
    if (this.instance == null) {
      this.instance = new NetworkStatusService();
    }
    return this.instance;
  }

  addObserver(observer) {
    this.observers.push(observer);
    return this.#isOnline;
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  initializeWebSocket() {
    this.socket = io();

    this.socket.on('connect', () => {
      this.updateNetworkStatus(true);
    });

    this.socket.on('disconnect', () => {
      this.updateNetworkStatus(false);
    });
  }

  updateNetworkStatus(status) {
    if (this.#isOnline !== status) {
      this.#isOnline = status;
      this.notifyObservers();
    }
  }

  notifyObservers() {
    this.observers.forEach(observer => observer.update(this.#isOnline));
  }

  // Public getter
  get isOnline() {
    return this.#isOnline;
  }
}