# Available Methods

We'll discuss each validator rule available on the validator file. Each validator validates any given input field,
a desired message can be passed to be returned upon validation failure this overwrites the default failure message.

- [`required`](#-required)
- [`email`](#-email)
- [`max`](#-max)
- [`min`](#-min)
- [`maxSize`](#-maxSize)
- [`minSize`](#-minSize)
- [`phone`](#-phone)

&nbsp;

# How To Use The Validator

*Passing the data to be validated*
```
let data = {
    user_name: 'your name'
}
```

&nbsp;

*Setting a rule for validation*
```
let rule = {
    user_name: 'required'
}
```

&nbsp;

*Message to be sent on validation failure*
```
let messages = {
    user_name: {
        required: 'A user name is required'
    }
}
```

&nbsp;

*Using default message on validation failure*
```
let messages = {

}
```
> Setting messages as an empty object will result to default error message being returned

&nbsp;

*Executing the validator*
```
let result = validate(data,rules,messages);
let errorCount = Object.keys(result).length;
```

&nbsp;

*Using more than one validation rule*
```
let rule = {
    user_name: 'required|maxSize:12'
}
```
> To use additional rules on a value simply separate the rules with a pipe `|` and the rule will be executed as well.

&nbsp;

*Using a custom validator*
```
let data = {answer:'toys'}
let rule = {answer: (value)=>{ return value === 'video games'? true : false}}
let messages = {answer: {custom:'the given answer is incorrect'}}

let result = validate(data,rules,messages);
console.log(result.answer);
// {custom:'the given answer is incorrect'}
```
> You can make a custom validator by passing in a function in place of a rule and making it return `true` or `false`. 
> If the input satisfies the condition then no errors will be returned.

&nbsp;

# Various Validator Methods

### `# required`

The `required` rule makes sure an input field is not null, either string or number passes the validation.

```
let data = {user_name: ''}
let rule = {user_name: 'required'}
let messages = {user_name: {required:'a user name is required'}}

let result = validate(data,rules,messages);
console.log(result.user_name);
// {required:'a user name is required'}
```

```
let data = {user_name: 'Mario'}
let rule = {user_name: 'required'}
let messages = {user_name: {required:'a user name is required'}}

let result = validate(data,rules,messages);
console.log(result.user_name);
// undefined

```

&nbsp;

### `# email`

The `email` rule checks if the passed in string fits in with regular expression of an email.

```
let data = {emailInput: 'Luigig.gmail.com'};
let rules = {emailInput: 'email'};
let messages = {emailInput: {email: 'email is not valid'}}

let result = validate(data,rules,messages);
console.log(result.emailInput);
// {email:'email is not valid'}
```

```
let data = {emailInput: 'Luigig@gmail.com'};
let rules = {emailInput: 'email'};
let messages = {emailInput: {email: 'email is not valid'}}

let result = validate(data,rules,messages);
console.log(result.emailInput);
// undefined
```

&nbsp;

### `# max`

The `max` rule checks if the passed in number is greater than the parameter stated.

```
let data = {ageInput: 39};
let rules = {ageInput:'max:25'};
let messages = {ageInput: {max: 'age is above the required value'}}

let result = validate(data,rules,messages);
console.log(result.ageInput);
// {max:'age is above the required value'}
```

```
let data = {ageInput: '24'};
let rules = {ageInput:'max:25'};
let messages = {ageInput: {max: 'age is above the required value'}}

let result = validate(data,rules,messages);
console.log(result.ageInput);
// undefined
```

&nbsp;

### `# min`

The `min` rule checks if the passed in number is greater than the parameter stated.

```
let data = {ageInput: 24};
let rules = {ageInput:'min:25'};
let messages = {ageInput: {min: 'age is below the required value'}}

let result = validate(data,rules,messages);
console.log(result.ageInput);
// {min:'age is below the required value'}
```

```
let data = {ageInput: '39'};
let rules = {ageInput:'min:25'};
let messages = {ageInput: {min: 'age is below the required value'}}

let result = validate(data,rules,messages);
console.log(result.ageInput);
// undefined
```

&nbsp;

### `# maxSize`

The `maxSize` rule checks if the input length is greater than the parameter stated.\
The `maxSize` rule can also check the length of an array.

```
let data = {address: 'castle three, super mario world 5'};
let rules = {address:'maxSize:25'};
let messages = {address: {maxSize: 'address is too long'}}

let result = validate(data,rules,messages);
console.log(result.address);
// {maxSize: 'address is too long'}
```

```
let data = {address: 'castle three'};
let rules = {address:'maxSize:25'};
let messages = {address: {maxSize: 'address is too long'}}

let result = validate(data,rules,messages);
console.log(result.address);
// undefined
```

```
let data = {list: [{id:1},{id:2},{id:3},{id:4}]};
let rules = {list:'maxSize:3'};
let messages = {list: {maxSize: 'list is too long'}}

let result = validate(data,rules,messages);
console.log(result.list);
// {maxSize: 'list is too long'}
```

```
let data = {list: [{id:1},{id:2},{id:3}]};
let rules = {list:'maxSize:3'};
let messages = {list: {maxSize: 'list is too long'}}

let result = validate(data,rules,messages);
console.log(result.list);
// undefined
```

&nbsp;

### `# minSize`

The `minSize` rule checks if the input length is lower than the parameter stated.\
The `minSize` rule can also check the length of an array.

```
let data = {address: 'castle three'};
let rules = {address:'minSize:25'};
let messages = {address: {minSize: 'address is too short'}}

let result = validate(data,rules,messages);
console.log(result.address);
// {minSize: 'address is too short'}
```

```
let data = {address: 'castle three super mario world 5'};
let rules = {address:'minSize:25'};
let messages = {address: {minSize: 'address is too short'}}

let result = validate(data,rules,messages);
console.log(result.address);
// undefined
```

```
let data = {list: [{id:1},{id:2}]};
let rules = {list:'minSize:3'};
let messages = {list: {minSize: 'list is too short'}}

let result = validate(data,rules,messages);
console.log(result.list);
// {minSize: 'list is too short'}
```

```
let data = {list: [{id:1},{id:2},{id:3},{id:4}]};
let rules = {list:'minSize:3'};
let messages = {list: {minSize: 'list is too short'}}

let result = validate(data,rules,messages);
console.log(result.list);
// undefined
```

&nbsp;

### `# phone`

The `phone` rule checks if the passed in string fits in with regular expression of a valid phone number.

```
let data = {phoneInput: '123456'};
let rules = {phoneInput: 'phone'};
let messages = {phoneInput: {phone: 'phone is not valid'}}

let result = validate(data,rules,messages);
console.log(result.phoneInput);
// {phone:'phone is not valid'}
```

```
let data = {phoneInput: '07032071948'};
let rules = {phoneInput: 'phone'};
let messages = {phoneInput: {phone: 'phone is not valid'}}

let result = validate(data,rules,messages);
console.log(result.phoneInput);
// undefined
```

&nbsp;