class _EventHandler {
  constructor() {
    this.handlers = {};
  }

  trigger(event, data) {
    if (this.handlers[event] !== undefined) {
      Object.keys(this.handlers[event]).forEach(registree => {
        const callbacks = this.handlers[event][registree];
        if (callbacks === undefined) return; // In case of asynchronous unregistering
        callbacks.forEach(callback => {
          callback(data);
        });
      });
    }
  }

  register(event, registree, callback) {
    if (this.handlers[event] === undefined) {
      this.handlers[event] = {};
    }

    if (this.handlers[event][registree] === undefined) {
      this.handlers[event][registree] = [];
    }

    this.handlers[event][registree].push(callback);
  }

  unregister(event, registree) {
    if (this.handlers[event] !== undefined) {
      if (this.handlers[event][registree] !== undefined) {
        this.handlers[event][registree] = undefined;
      }
    }
  }
}

const EventHandler = new _EventHandler();

export default EventHandler;
