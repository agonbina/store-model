
var assert = require('assert');

var Model = function (schema, options) {
    var model = this;

    Model.addModel(schema, model);

    return model;
};

Model.prototype = {
  create: require('./create')
};

Model._schemas = {};

Model.getModel = function (name) {
    var model = this._schemas[name];
    assert(model, 'Schema ' + name + ' does not exist.');
    return model;
};

Model.addModel = function (schema, model) {
    assert(schema.id, 'Must specify an id(name) for the schema');
    this._schemas[schema.id] = model;
};

module.exports = Model;
