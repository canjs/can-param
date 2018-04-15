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
	}), encodeURI("age[or][][lte]=5&age[or][]=null"));

	QUnit.deepEqual(param({
		"undefined": undefined,
		"null": null,
		"NaN": NaN,
		"true": true,
		"false": false
	}),"undefined=undefined&null=null&NaN=NaN&true=true&false=false","true, false, undefined, etc");
});
