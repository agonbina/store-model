
/**
 * Module dependencies
 */

var Store = require('datastore');
var assert = require('assert');

try {
    var Enumerable = require('enumerable');
} catch (e) {
    Enumerable = require('enumerable-component');
}

module.exports = function (store) {

    /**
     * Returns the count of items in the collection
     */

    store.length = function () {
        return this.data.length;
    };


    /**
     * Implementation of the Enumerable iterator
     *
     * @returns {{length: length, get: get}}
     * @private
     */

    store.__iterate__ = function () {
        return {
            length: function () { return store.length() },
            get: function (i) { return store.get(i) }
        };
    };

    Enumerable(store);


    /**
     * Inserts an item in the collection array and emits the 'added' event
     *
     * @param item
     * @returns {store}
     */

    store.add = function (item) {
        var self = this;

        assert(item instanceof Store, 'Item must be a Store instance');
        assert(!self.has(item), 'This item is already in the collection');

        var position = store.length();
        this.set(position, item);
        this.emit('added', item);

        return self;
    };


    /**
     * Remove an item from the collection and emits the 'removed' event
     *
     * @param item
     * @returns {store}
     */

    store.remove = function (item) {
        var self = this;

        assert(item instanceof Store, 'Item must be a Store instance');
        assert(self.has(item), 'Item is not contained in this collection');

        var position = self.indexOf(item);

        self.data.splice(position, 1);
        self.emit('removed', item);

        return self;
    };


    /**
     * Removes all items matching the query hash
     *
     * @param query
     */

    store.removeWhere = function (query) {
        var self = this;

        assert(typeof query === 'object', 'Query must be an object with keys(attributes):(criteria)');

        function removeItem(key) {
            var criteria = query[key];

            // TODO: Refactor to something less ugly
            self
                .select(function (item) {
                    return item.get(key) === criteria;
                })
                .each(function (item) {
                    self.remove(item);
                });
        }

        (Object.keys(query)).forEach(removeItem);
    }

};