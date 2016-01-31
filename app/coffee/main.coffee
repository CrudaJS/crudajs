'use strict'

require.config
  paths:
    ractive: '../../bower_components/ractive/ractive'
    rvc: '../../bower_components/rvc/dist/rvc'
    router: '../../bower_components/router.js/dist'

require [
  'app'
], (crudajs) ->

  console.log 'CrudaJS is starting...'
  crudajs.init()
  return