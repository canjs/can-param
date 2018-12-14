var QUnit = require("steal-qunit");
var param = require("./can-param");

QUnit.module("can-param");

QUnit.test("can-param", function(){
	QUnit.deepEqual( param( {foo: "bar", baz: "zed"} ), "foo=bar&baz=zed", "Regular object");
	QUnit.deepEqual( param( {foo: {bar: "baz"}} ), encodeURI("foo[bar]=baz"), "Nested object");
	QUnit.deepEqual( param( {foo: ["bar", "baz"]} ), encodeURI("foo[]=bar&foo[]=baz"), "Nested array");
	QUnit.deepEqual( param( {foo: "bar & baz"} ), "foo=bar+%26+baz", "Spec chars values");
	QUnit.equal(param({
		age: {
			or: [ {lte: 5}, null ]
		}
	}), encodeURI("age[or][0][lte]=5&age[or][1]=null"));

	QUnit.deepEqual(param({
		"undefined": undefined,
		"null": null,
		"NaN": NaN,
		"true": true,
		"false": false
	}),"undefined=undefined&null=null&NaN=NaN&true=true&false=false","true, false, undefined, etc");
});

QUnit.test("Encoding arrays of objects includes indices", function(){
	var object = {items: [{name:'one'}, {name:'two'}]};
	var out = param(object);

	QUnit.equal(out, "items%5B0%5D%5Bname%5D=one&items%5B1%5D%5Bname%5D=two");
});

QUnit.test("Encoding array of primitives does not include indices", function() {
	var object = {items: ['one', 'two']};
	var out = param(object);

	QUnit.equal(out, "items%5B%5D=one&items%5B%5D=two");
});
