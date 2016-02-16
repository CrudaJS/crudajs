'use strict'

define [
  'router/router.min', 'ractive', 'conf'
], (Router, Ractive, conf) ->

  init: ->
    console.log 'Ractive options: ' + Ractive.options + '  ==========>'
    console.log 'Hi world!!'
    console.log 'Config: ' + conf

    router = new Router()
      .addRoute '#/', () ->

        ractive = new Ractive
          el: '#mainContainer'
          template: '#mainTemplate'

        return
      .addRoute '#/users', (req, next) ->
        console.log 'Hello user'
        console.log 'Req: ' + req
        console.log 'Next: ' + next
        return
      .run '#/'
    return
