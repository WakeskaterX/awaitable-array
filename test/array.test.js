const chai = require('chai');
const expect = chai.expect;
const AwaitableArray = require('../index.js');

describe('AwaitableArray', () => {
  it('should wait for something to push to it', async () => {
    let arr = new AwaitableArray();

    setTimeout(() => arr.push(1), 10);

    await arr.untilLength(1);

    expect(arr).to.deep.equal([ 1 ]);
  });

  it('should create an array from an existing array and resolve immediately', async () => {
    let arr = new AwaitableArray(...[ 1, 2, 3, 4 ]);
    await arr.untilLength(4);

    expect(arr).to.deep.equal([ 1, 2, 3, 4 ]);
  });
});
