describe('store-model plugin', function () {

    var Human = new Model({ id: 'Human' }, { url: '/humans' });
    var human = Human.create({ id: 'agonbina' });

    it('should add a .model() method', function () {
        expect(human.model).to.be.a('function');
        expect(human.model()).to.deep.equal({
            id: 'agonbina',
            href: '/humans/agonbina'
        });
    });

});