define (require) ->
  window.URI = require 'urijs/URI'
  window.URITemplate = require 'urijs/URITemplate'
  Hyperagent = require 'hyperagent'

  Hyperagent