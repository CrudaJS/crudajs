'use strict'

define [
  'router/router.min', 'ractive', 'traverson', 'traverson-hal'
], (Router, Ractive, Traverson, TraversonHal) ->

  init: ->
    console.log 'Hi world!!'

    Traverson.registerMediaType(TraversonHal.mediaType, TraversonHal);

    traverson = Traverson.from('http://localhost:8080/profile').jsonHal()
    console.log traverson

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
