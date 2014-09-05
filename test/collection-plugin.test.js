describe('store-collection plugin', function () {

    var myModel = new Store({ name: 'myModel' });
    var collection = new Store([
        myModel,
        new Store({ name: 'otherModel' })
    ]);

    it('should add a .length method to return the number of instances in a collection', function () {

        expect(collection).to.not.respondTo('length');

        collection.use(collectionPlugin);
        expect(collection).to.respondTo('length');
        expect(collection.length()).to.equal(2);
    });

    it('should implement __iterate__ to integrate Enumerable', function () {
        collection.use(collectionPlugin);
        expect(collection.__iterate__).to.exist;

        var iterator = collection.__iterate__();

        expect(iterator).to.respondTo('length')
            .and.to.respondTo('get');
    });

    it('should correctly add the Enumerable methods to the collection instance', function () {
        collection.use(collectionPlugin);

        function getNames() {
            return collection.map(function (item) {
                return item.get('name');
            }).value(); // returns an Array
        }

        expect(getNames()).to.have.length(2);
        expect(getNames()).to.include.members(['myModel', 'otherModel']);

        expect(collection.indexOf(myModel)).to.equal(0);
    });

    describe('.add', function () {

        var newUser = new Store({ name: 'Agon' });

        before(function () {
            collection = new Store([]);
            collection.use(collectionPlugin);
        });

        beforeEach(function () {
            collection.reset([]);
        });

        it('should exist', function () {
            expect(collection).to.respondTo('add');
        });

        it('should throw if a Store instance is not passed as argument', function () {
            expect(function addItem() {
                collection.add();
            }).to.throw(Error);
        });

        it('should throw if trying to add the same instance again', function () {
            var duplicate = new Store({ name: 'duplicate' });
            collection.add(duplicate)

            expect(function () {
                collection.add(duplicate);
            }).to.throw(/This item is already in the collection/);
        });

        it('should emit an "added" event', function () {
            var itemAdded = sinon.spy();

            collection.on('added', itemAdded);
            collection.add(newUser);

            expect(itemAdded).to.have.been.calledOnce;
            expect(itemAdded).to.have.been.calledWith(newUser);
        });

        it('should add an item to the collection', function () {
            var prevLength = collection.length();

            collection.add(newUser);

            expect(collection.length()).to.equal(prevLength + 1);
            expect(collection.has(newUser)).to.be.true;
        });

    });

    describe('.remove and .removeWhere', function () {

        var cat = new Store({ name: 'cat', type: 'animal' });
        var me = new Store({ name: 'Agon', type: 'human' });
        var dog = new Store({ name: 'dog', type: 'animal' });
        var users = null;

        beforeEach(function () {
            users = new Store([cat, me, dog]).use(collectionPlugin);
        });

        it('should exist', function () {
            expect(collection).to.respondTo('remove');
            expect(collection).to.respondTo('removeWhere');
        });

        it('should remove a Store instance from the collection', function () {
            expect(users.has(me)).to.be.true;

            users.remove(me);
            expect(users.has(me)).to.be.false;
        });

        it('should emit a "removed" event', function () {
            var onRemoved = sinon.spy();

            users.on('removed', onRemoved);
            users.remove(me);

            expect(onRemoved).to.have.been.calledOnce;
            expect(onRemoved).to.have.been.calledWith(me);
        });

        it('should remove all instances found by the specified query', function () {
            var onRemoved = sinon.spy();

            users.on('removed', onRemoved);
            users.removeWhere({ type: 'animal' });

            expect(onRemoved).to.have.been.calledTwice;
            expect(onRemoved).to.have.been.calledWith(cat);
            expect(onRemoved).to.have.been.calledWith(dog);

            expect(users.length()).to.equal(1);
            expect(users.has(cat)).to.be.false;
            expect(users.has(dog)).to.be.false;
        });

    });

});