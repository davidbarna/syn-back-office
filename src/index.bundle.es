import angular from './lib/angular'
import Config from './lib/config'

var win = window
var _module = {
  angular: angular,
  config: Config.getInstance()
}

win.syn = win.syn || {}
win.syn.bo = _module

export default _module
