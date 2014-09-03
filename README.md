# store-model

A Model interface on top of [datastore](https://github.com/bredele/datastore/).

## API

```
var Model = require('store-model');

// Create a new Model type
var schema = { 
 id: 'User', 
 properties: {
    username: { type: 'string' },
    age: { type: 'number' }
 }
}
var options = { url: '/users' };

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

