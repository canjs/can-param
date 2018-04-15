@module {function} can-param can-param
@parent can-routing
@collection can-infrastructure
@package ./package.json
@description Serialize an object or array into a query string.

@signature `param(object)`

Serializes an object or array into a query string useful for making Ajax requests. `param` handles nested objects and arrays.  It uses `encodeURIComponent` to
escape values and keys.

```js
import param from "can-param";

param( { foo: "bar" } );          //-> "foo=bar"
param( { foo: [ "bar", "baz" ] } ); //-> "foo[]=bar&foo[]=baz"
param( { foo: { bar: "baz" } } );    //-> "foo[bar]=baz"
param( { foo: "bar & baz" } );    //-> "foo=bar+%26+baz"
```

This is exported as `param` on [can-namespace].

@param {Object} object An object or array. 
@return {String} The params formatted into a form-encoded string.

@body

## Try it

Use this JS Bin to play around with this package:

<a class="jsbin-embed" href="https://jsbin.com/zezamig/embed?js,console">can-param on jsbin.com</a>
<script src="https://static.jsbin.com/js/embed.min.js?4.0.4"></script>
