import angular from './lib/angular'
import Config from './lib/config'

var win = window
var boModule = {
  angular: angular,
  config: Config.getInstance()
}

win.syn = win.syn || {}
win.syn.bo = boModule

export default boModule
