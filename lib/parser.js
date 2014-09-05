
var Model = require('./model');
var Collection = require('store-collection');

module.exports = function (schema) {

    // Should parse properties of:
    // 'array' type
    // 'object' ie those containing '$ref' only

    var result = {};
    var properties = schema.properties;
    var keys = Object.keys(properties);

    function resolveProperty(key) {
        var type = properties[key]['type'];
        var $ref = properties[key]['$ref'];


        /**
        result[key] = type && (type === 'array') ? [] :
                      $ref ? new Collection(Model.getModel('Human')) :
                      undefined;
        */

        if(type && (type === 'array')) {
            result[key] = [];
        } else if($ref) {
            var model = Model.getModel($ref);
            console.log(model instanceof Model);
            console.log(model);
            result[key] = new Collection(model);
        } else {
            result[key] = undefined;
        }
    }

    keys.forEach(resolveProperty);

    return result;
};