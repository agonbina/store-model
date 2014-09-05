// Export modules to global scope as necessary (only for testing)
if (typeof process !== 'undefined' && process.title === 'node') {
    // We are in node. Require modules.
    chai = require('chai');
    expect = chai.expect;
    sinon = require('sinon');
    sinonChai = require('sinon-chai');

    chai.use(sinonChai);

    Store = require('datastore');
	Model = require('..').Model;
    Collection = require('..').Collection;

    collectionPlugin = require('../lib/collection-plugin');

    isBrowser = false;
} else {
    // We are in the browser. Set up variables like above using served js files.
    expect = chai.expect;

	Model = require('store-model').Model;
    Collection = require('store-model').Collection;

    isBrowser = true;
}
