
var Model = require('./model');
var Collection = require('./collection');

module.exports = function (schema) {

    var result = {};
    var properties = schema.properties;
    var keys = Object.keys(properties);

    function resolveProperty(key) {
        var property = properties[key];
        var type = property['type'];
        var $ref = property['$ref'];
        var model = null;

        if(type && type === 'array') {
            var modelName = property.items['$ref'];

            model = Model.getModel(modelName);
            result[key] = (new Collection(model)).create([]);

        } else if($ref) {
            model = Model.getModel($ref);
            result[key] = model.create();

        } else {
            result[key] = undefined;
        }
    }

    keys.forEach(resolveProperty);

    return result;
};