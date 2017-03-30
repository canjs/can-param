# can-param

[![Build Status](https://travis-ci.org/canjs/can-param.png?branch=master)](https://travis-ci.org/canjs/can-param)

Serialize an array or object into a query string.

## Usage

### ES6 use

With StealJS, you can import this module directly in a template that is autorendered:

```js
import plugin from 'can-param';
```

### CommonJS use

Use `require` to load `can-param` and everything else
needed to create a template that uses `can-param`:

```js
var plugin = require("can-param");
```

## AMD use

Configure the `can-param` package:

```html
<script src="require.js"></script>
<script>
	require.config({
	    packages: [{
		    	name: 'can-param',
		    	location: 'node_modules/can-param/dist/amd',
		    	main: 'lib/can-param'
	    }]
	});
	require(["main-amd"], function(){});
</script>
```

### Standalone use

Load the `global` version of the plugin:

```html
<script src='./node_modules/can-param/dist/global/can-param.js'></script>
```
