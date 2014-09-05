
/**
 * Module dependencies
 */

var Store = require('datastore');
var storeModel = require('./plugin');
var assert = require('assert');


/**
 * Model type constructor
 *
 * @param schema - JSON v4 draft schema
 * @param options - [ url ]
 * @returns {Model}
 * @constructor
 */

var Model = function (schema, options) {
    var model = this;
    model.options = new Store(options || {});

    Model.addModel(schema, model);

    return model;
};

Model.prototype = {

    create: function (data) {
        var instance = new Store(data || {});
        instance.use(storeModel);

        // Adds a computed 'href' attribute to the model
        var options = this.options;
        if (options.has('url') && instance.has('id')) {
            instance.compute('href', function () {
                return options.get('url') + '/' + this.id;
            });
        }

        // Store a reference to the schema in the store instance
        if(!instance.schema) instance.schema = this.schema;

        return instance;
    }

};


/**
 * Stores all the registered Model types
 *
 * @type {{}}
 * @private
 */

Model._schemas = {};


/**
 * Getter to retrieve a previously registered Model type
 *
 * @param name
 * @returns {*}
 */

Model.getModel = function (name) {
    var model = this._schemas[name];
    assert(model, 'Schema ' + name + ' does not exist.');
    return model;
};


/**
 * Store a newly created Model type
 *
 * @param schema
 * @param model
 */

Model.addModel = function (schema, model) {
    assert(schema.id, 'Must specify an id(name) for the schema');

    // Store a reference to the schema in the Model type
    if(!model.schema) model.schema = schema;

    this._schemas[schema.id] = model;
};

module.exports = Model;
