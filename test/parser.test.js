
var parser = require('../lib/parser');
var HumanSchema = {
        id: 'Human',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' }
        }
    },
    AnimalSchema = {
        id: 'Animal',
        properties: {
            id: { type: 'string' }
        }
    },
    ZooSchema = {
        id: 'Zoo',
        properties: {
            id: { type: 'string' },
            zooKeeper: { $ref: 'Human' },
            animals: { type: 'array', items: { $ref: 'Animal' } }
        }
    };

describe('schema parser', function () {

    var Human, Animal, Zoo;

    before(function () {
        Human = new Model(HumanSchema, { url: '/humans' });
        Animal = new Model(AnimalSchema, { url: '/animals' });
        Zoo = new Model(ZooSchema, { url: '/zoos' });
    });

    it('should resolve all the properties of a given schema', function () {
        var result = parser(ZooSchema);

        expect(result).to.be.an('object');
        expect(result.id).to.be.undefined;

        expect(result.zooKeeper.schema).to.equal(HumanSchema);
        expect(result.zooKeeper).to.be.instanceof(Store);
        expect(result.zooKeeper.has('name')).to.be.false;

        expect(result.animals).to.be.instanceof(Store);
        expect(result.animals.length()).to.equal(0);
        expect(result.animals).to.respondTo('add');
    });

});