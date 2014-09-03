[ ![Codeship Status for agonbina/store-model](https://www.codeship.io/projects/a9756730-139c-0132-72d3-2aacea43c16d/status?branch=master)](https://www.codeship.io/projects/33335)

# store-model

A Model interface on top of [datastore](https://github.com/bredele/datastore/).

## API

```
var Model = require('store-model');

var schema = { 
 id: 'User', 
 properties: {
    username: { type: 'string' },
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
var data = { username: 'agonbina', age: 25 }
var user = User.create(data);
user.get('username')    // 'agonbina'
user.get('age')         // 25
user.model()            // data 
```


## Example:

