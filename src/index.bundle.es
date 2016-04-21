import angular from './lib/angular'

var win = window
var _module = {
  angular: angular
}

win.syn = win.syn || {}
win.syn.bo = _module

export default _module
