var QUnit = require("steal-qunit");
var param = require("./can-param");

QUnit.module("can-param");

QUnit.test("can-param", function(){
	QUnit.deepEqual( param( {foo: "bar", baz: "zed"} ), "foo=bar&baz=zed", "Regular object");
	QUnit.deepEqual( param( {foo: {bar: "baz"}} ), encodeURI("foo[bar]=baz"), "Nested object");
	QUnit.deepEqual( param( {foo: ["bar", "baz"]} ), encodeURI("foo[]=bar&foo[]=baz"), "Nested array");
	QUnit.deepEqual( param( {foo: "bar & baz"} ), "foo=bar+%26+baz", "Spec chars values");
});
