###
# Navigation

Responsible for launching state events that can be
listened to by any other module.

###
EventEmitter = require( 'events' ).EventEmitter
instance = null

class Navigation extends EventEmitter

  ###
   * Change event name
  ###
  CHANGE: 'state-change'

  ###
   * @constructor
  ###
  constructor: ->
    @_states = {}

  ###
   * Defines states that can be used by go func
   * @param {Object[]} states
   * @param {string} states[].name - Name of the state
  ###
  setStates: ( states ) ->
    for name, state of states
      @_states[name] = state

  ###
   * Removes all defined states
   * @return {[type]} [description]
  ###
  clearStates: ->
    @_states = {}

  ###
   * Emits an `CHANGE` event with 2 parameters: stateName, params
   * @param  {string} stateName Name of target state or key of defined state
   * @param  {object} params Params need for the state (optional)
   * @return {undefined}
  ###
  go: ( stateName, params ) ->
    stateName = @_states[stateName]?.name || stateName
    @emit Navigation::CHANGE, stateName, params
    return

  ###
   * Sets the last opened state
   * @param {string} @currentState State name
  ###
  setCurrentState: ( @currentState ) -> return this

  ###
   * Sets the last opened state params
   * @param {object} @currentParams State params
  ###
  setCurrentParams: ( @currentParams ) -> return this

  ###
   * Returns current state name
   * @return {string}
  ###
  getState: -> return @currentState

  ###
   * Returns current state params object
   * @return {object}
  ###
  getParams: -> return @currentParams



###
 * Gets a unique instance of Navigation
 * @return {Navigation}
###
Navigation.getInstance = ->
  instance = new Navigation() unless !!instance
  return instance

module.exports =  Navigation
