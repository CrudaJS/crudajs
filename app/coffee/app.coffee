'use strict'

define [
  'router/router.min', 'ractive'
], (Router, Ractive) ->

  init: ->
    console.log 'Ractive options: ' + Ractive.options + '  ==========>'
#    console.log 'HomeController: ' + homeController.init()
    console.log 'Hi world!!'

    router = new Router().
      addRoute '#/users', (req, next) ->
        console.log 'Hello user'
        console.log 'Req: ' + req
        console.log 'Next: ' + next
        return

    return
