
describe('Model', function () {

    var User = null;
    var UserSchema = {
        id: 'User',
        properties: {
            id: { type: 'string' },
            age: { type: 'number' }
        },
        required: [ 'username' ]
    };

    before(function () {
        User = new Model(UserSchema, { url: '/users' });
    });

    it('should exist', function () {
       expect(Model).to.be.a('function');
    });

    it('should create a Model type', function () {
        expect(User).to.be.an.instanceof(Model);
        expect(User.create).to.be.a('function');
    });

    it('should store a reference of the created model type in _schemas', function () {
        var PlayerSchema = { id: 'Player' };
        var spy = sinon.spy(Model, 'addModel');
        var Player = new Model(PlayerSchema, { url: '/players' });

        expect(Model.getModel(PlayerSchema.id)).to.equal(Player);
        expect(spy.calledOnce).to.be.true;

        Model.addModel.restore();
    });

    describe('Model instance', function () {

        describe('.create', function () {

            var HumanSchema = { id: 'Human' };
            var Human = new Model(HumanSchema, { url: '/humans' });
            var user = Human.create({ id: 'agonbina' });

            it('should store a reference to its schema', function () {
               expect(user.schema).to.equal(HumanSchema);
            });

            it('should create an instance of Store', function () {
                expect(user.has('id')).to.be.true;
                expect(user.get('id')).to.equal('agonbina');
            });

            it('should add a computed property to automatically update the models {href} value', function () {
                expect(user.has('href')).to.be.true;
                expect(user.get('href')).to.equal('/humans/agonbina');
            });
        });

    });

});
