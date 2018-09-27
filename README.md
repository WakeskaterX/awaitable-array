# Awaitable Array
Utility Library for Creating Arrays that can be awaited

Uses:
* Writing efficient test cases

### Usage

```javascript
const AwaitableArray = require('awaitable-array');

// Wait until something is pushed to the array
let arr = new AwaitableArray();

setTimeout(() => arr.push(5), 500);

await arr.untilLength(1);

console.log(arr);  // [ 5 ]

// Create array from existing array
let arrExisting = [ 1, 2, 3, 4 ];

// Use the spread operator to expand the array to create a new AwaitableArray
let arr2 = new AwaitableArray(...arrExisting);

// Resolves Immediately
await arr.untilLength(4);

console.log(arr); // [ 1, 2, 3, 4 ]
```

### Notes
Requires Node6 or Higher
