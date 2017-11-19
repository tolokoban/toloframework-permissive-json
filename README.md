# toloframework-permissive-json
Permissive JSON parser. Accept comments, missing quotes and commas, unspecified attributes names in objects.

## Usage
```js
var PermissiveJSON = require("./toloframework-permissive-json");
var obj = PermissiveJSON.parse( "[A{B}]" );
```

## Example
Permissive JSON:
```js
{ul
  // This comment will be ignored.
  class: [bright, shadowed]
  [
    {li ["Happy birthday!"]}
    {li ["Mister president."]}
  ]
}
```

The same object in stric JSON:
```js
{
  "0": "ul",
  "class": ["bright", "shadowed"],
  "1": [
    { "0": "li", "1": ["Happy birthday!"] },
    { "0": "li", "1": ["Mister president."] }
  ]
}
```
