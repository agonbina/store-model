describe('Collection', function () {

    var userSchema = {
        id: 'User',
        properties: {
            id: { type: 'string' }
        }
    }, User = null;

    before(function () {
        User = new Model(userSchema, { url: '/users' });
    });

    it('should throw if a Model is not specified', function () {
        var createCollection = function () {
            return new Collection({});
        };

        expect(createCollection).to.throw(/The Model passed in as an argument is not of type Model/);
    });

    it('should create an instance of Collection', function () {
        var Users = null;

        function createUser() {
            Users = new Collection(User);
        }

        expect(createUser).to.not.throw(Error);
        expect(Users).to.be.instanceof(Collection);
    });

    describe('.create', function () {

        var Users = null;

        before(function () {
            Users = new Collection(User);
        });

        it('should exist', function () {
            expect(Users).to.respondTo('create');
        });

        it('should throw if passed in data is not an Array', function () {
            function createBadUser() {
                Users.create({});
            }

            expect(createBadUser).to.throw(/data must be an array containing Model instances/);
        });

        it('should create a Store instance', function () {
            var agon = User.create({ id: 'agonbina' });
            var users = Users.create([ agon ]);

            expect(users).to.be.instanceof(Store);
            expect(users.get(0)).to.equal(agon);
        });

    });

});
