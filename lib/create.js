
var Store = require('datastore');

module.exports = function (data) {
    var model = new Store(data || {});

    return model;
};