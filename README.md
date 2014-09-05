[ ![Codeship Status for agonbina/store-model](https://www.codeship.io/projects/2e8696c0-15f2-0132-c4e7-72c6c37b1f6e/status)](https://www.codeship.io/projects/33774)

# store-model

A Model interface on top of [datastore](https://github.com/bredele/datastore/).

## Features
- Syntactic sugar on top of 'datastore' for Models
- Use JSON Schemas to define the model properties and validate it 
- Supports nested Collection properties. Example:
    ```
    var userSchema = {id: 'User',
        properties: {
            id: { type: 'string' },
            friends: {
                type: 'array', items: { $ref: 'User' }
            }
        },
        required: [ 'id' ]
    }
    var User = new Model(userSchema, options);
    var agon = User.create({ id: 'agonbina' });
    var friend = User.create({ id: 'gonigkum' });
    agon
        .get('friends')
        .add(friend);    
        
    friend.get('href') => '/users/agonbina/friends/gonigkum'
    ```

## API

```
var Model = require('store-model').Model;

var schema = { 
 id: 'User', 
 properties: {
    id: { type: 'string' },
    age: { type: 'number' }
 }
}
var options = { url: '/users' };

// Create a new Model type
var User = new Model(schema, options);
```
#### .create()
Create a new instance of User.
```
var data = { id: 'agonbina', age: 25 }
var user = User.create(data);
user.get('id')          // 'agonbina'
user.get('age')         // 25
user.get('href')        // '/users/agonbina'
user.model()            // data 
```
## Collection API

```
var Users = new Collection(User);
var users = Users.create([
    User.create({ id: 'agonbina' }),
    User.create({ id: 'gonigkum' })
]);

users.each(function(user) {
    console.log(user.get('id'));
}); // 'agonbina', 'gonigkum'

```

### instance.add(obj:Store)
Add a new item to the collection. The item **must** be a Store instance.
```
users.add(User.create({ id: 'someUsername' }));
```
Emits an 'add' event.
```
users.on('add', function(user) {
    user.get('id'); // 'someUsername'
});
```

### instance.remove(obj:Store)
Remove an item from the collection.

```obj``` can be a Store instance or a query filter. 
```
var me = User.create({ id: 'agonbina' });
users.remove(me);
```

## instance.removeWhere(query:Mixed)
Remove all items matching the query object.
```
users.removeWhere({ id: 'agonbina' }); // Remove all users with id: 'agonbina'
```

### instance.length()
Returns the number of elements in the collection.

## Example:

