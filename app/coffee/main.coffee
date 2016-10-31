'use strict'

require.config
  paths:
    ractive: '../../bower_components/ractive/ractive'
    rvc: '../../bower_components/rvc/dist/rvc'
    router: '../../bower_components/router.js/dist'
    jquery: '../../bower_components/jquery/dist/jquery.min'
    traverson: '../../bower_components/traverson/browser/dist/traverson.min'
    'traverson-hal': '../../bower_components/traverson-hal/browser/dist/traverson-hal.min'
    conf: './config'

require [
  'app'
], (crudajs) ->

  console.log 'CrudaJS is starting...'
  crudajs.init()
  return