
module.exports = function (store) {

    /**
     * A getter for the datastore instance data
     */

    store.model = function () {
        return store.data;
    }

};