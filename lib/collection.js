
/**
 * Module dependencies
 */

var Store = require('datastore');
var assert = require('assert');
var Model = require('./model');
var collectionPlugin = require('./collection-plugin');

var Collection = function(Type) {
    assert(Type instanceof Model, 'The Model passed in as an argument is not of type Model');
};

Collection.prototype = {

    create: function (data) {
        assert(data && Array.isArray(data), 'data must be an array containing Model instances');

        var store = new Store(data);
        store.use(collectionPlugin);

        return store;
    }

};

module.exports = Collection;
