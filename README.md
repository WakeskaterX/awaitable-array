# Awaitable Array
Utility Library for Creating Arrays that can be awaited

Uses:
* Writing efficient test cases

## Usage


### Waiting for Length
```javascript
const AwaitableArray = require('awaitable-array');

// Wait until something is pushed to the array
let arr = new AwaitableArray();

setTimeout(() => arr.push(5), 500);

await arr.untilLength(1);

console.log(arr);  // [ 5 ]
```

### Waiting for a Condition
```javascript
const AwaitableArray = require('awaitable-array');

// Wait until something is pushed to the array
let arr = new AwaitableArray();

let i = 0;
let interval = setInterval(() => arr.push(++i), 500);

// after 2500 ms
await arr.untilCondition(arrayInstance => arrayInstance.includes(5));

console.log(arr);  // [ 1, 2, 3, 4, 5 ]

clearInterval(interval);
```

### Create From Existing
```javascript
const AwaitableArray = require('awaitable-array');
let arrExisting = [ 1, 2, 3, 4 ];

// Use the spread operator to expand the array to create a new AwaitableArray
let arr2 = new AwaitableArray(...arrExisting);

// Resolves Immediately (next tick)
await arr2.untilLength(4);

console.log(arr); // [ 1, 2, 3, 4 ]
```

### Padding Response Time
```javascript
const AwaitableArray = require('awaitable-array');
// Can also pass in a padding (wait at LEAST this time) and a Timeout
let arr3 = new AwaitableArray();

const padding = 10;
const timeout = 50;   // Defaults to 2000ms
await arr3.untilLength(100, padding, timeout);  // Waits 50ms

// Wait at LEAST 10ms
const arr4 = new AwaitableArray(...[1, 2, 3]);

const padding = 10;
await arr4.untilLength(3, padding);  // Waits 10ms
```

### Timeout Errors
```javascript
// Timeout Error
const arr5 = new AwaitableArray(...[1, 2]);

try {
  await arr5.untilLength(30, 0, 1000);  // Throws Promise.TimeoutError after 1 second
} catch (e) {
  console.log(e); // Promise.TimeoutError (see http://bluebirdjs.com/docs/api/timeout.html)
}
```

### Notes
Requires Node6 or Higher
