require.config({
  paths: {
    'amd-loader': '../../bower_components/requirejs-ractive/vendor/amd-loader',
    // rv: '../../bower_components/requirejs-ractive/rv',
    ractive: '../../bower_components/ractive/ractive'
  }
});

require(['app'], function (crudajs) {
  'use strict';
  crudajs.init();
});
