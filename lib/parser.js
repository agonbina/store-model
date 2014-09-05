
var Model = require('./model');
var Collection = require('./collection');

module.exports = function (schema) {

    var result = {};
    var properties = schema.properties;
    var keys = Object.keys(properties);

    function resolveProperty(key) {
        var type = properties[key]['type'];
        var $ref = properties[key]['$ref'];

        result[key] = type && (type === 'array') ? [] :
                      $ref ? new Collection(Model.getModel('Human')) :
                      undefined;
    }

    keys.forEach(resolveProperty);

    return result;
};