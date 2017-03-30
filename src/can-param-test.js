import QUnit from 'steal-qunit';
import plugin from './can-param';

QUnit.module('can-param');

QUnit.test('Initialized the plugin', function(){
  QUnit.equal(typeof plugin, 'function');
  QUnit.equal(plugin(), 'This is the can-param plugin');
});
