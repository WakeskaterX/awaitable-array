const Promise = require('bluebird');

/**
 * Returns a Proxy for an Array (or specified array) which can be awaited until a certain length is reached.
 * Use the following method: untilLength(length = 1, padding = 0, timeout = 2000)
 * @constructor [...args] Array Arguments
 * @returns {Proxy<Array>}
 */
class AwaitableArray extends Array {
  constructor(...args) {
    super(...args);
    this.handlers = {};
    return new Proxy(this, this.handlers);
  }

  /**
   * Returns a Promise that Resolves when the array reaches a given length
   * @param {number} length
   * @param {number} [padding] - optional wait time in ms after the length is reached to resolve
   * @param {number} [timeout] - optional timeout - defaults to 2000 ms
   */
  untilLength(length = 1, padding = 0, timeout = 2000) {
    return new Promise((resolve) => {
      if (this.length >= length) {
        delete this.handlers.set;

        if (padding > 0) {
          return Promise.delay(padding).then(resolve);
        }

        return resolve();
      }

      // Desired length not reached yet
      this.handlers.set = (target, property, value) => {
        target[property] = value;

        if (target.length === length) {
          if (padding > 0) {
            Promise.delay(padding).then(resolve);
          } else {
            resolve();
          }
        }

        return true;
      };
    }).timeout(timeout).catch(Promise.TimeoutError, (err) => {
      delete this.handlers.set;
      throw err;
    });
  }

  /**
   * Returns a Promise that Resolves when a condition is given
   * @param {function} condition
   * @param {number} [padding] - optional wait time in ms after the length is reached to resolve
   * @param {number} [timeout] - optional timeout - defaults to 2000 ms
   */
  untilCondition(condition, padding = 0, timeout = 2000) {
    return new Promise((resolve) => {
      if (condition(this)) {
        delete this.handlers.set;

        if (padding > 0) {
          return Promise.delay(padding).then(resolve);
        }

        return resolve();
      }

      // Desired length not reached yet
      this.handlers.set = (target, property, value) => {
        target[property] = value;

        if (condition(target)) {
          if (padding > 0) {
            Promise.delay(padding).then(resolve);
          } else {
            resolve();
          }
        }

        return true;
      };
    }).timeout(timeout).catch(Promise.TimeoutError, (err) => {
      delete this.handlers.set;
      throw err;
    });
  }
}

module.exports = AwaitableArray;
