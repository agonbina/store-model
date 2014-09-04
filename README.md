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
var Model = require('store-model');

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


## Example:

