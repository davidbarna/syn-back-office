import { pubsub } from 'syn-core'
import synAuth from 'syn-auth'
import Config from '../../lib/config'
import buttons from '../../config/nav'
import Navigation from '../../lib/nav'
import states from '../../config/states'

const MENU_CHANNEL = 'syn.backOffice.menuChannel'
const LOGIN_CHANNEL = 'syn.backOffice.login'
var gSession = synAuth.session.global

/**
 * Main back office app controller
 */
class BackOfficeCtrl {

  constructor (onClick) {
    this.config = Config.getInstance()
    this.api = this.config.api
    this.onClick = onClick
    this.nav = Navigation.getInstance()
    gSession.on(gSession.CHANGE, this.sessionChange.bind(this))
  }

  init (onClick) {
    this.nav.setStates(states)
    this.menuSub = pubsub.channel.factory.create(MENU_CHANNEL, [ 'click' ])
    this.menuSub.click.subscribe(onClick)
    this.loginSub = pubsub.channel.factory.create(LOGIN_CHANNEL, [ 'success' ])
    this.loginSub.success.subscribe((session) => {
      gSession.set(session)
    })

    this.sessionChange(gSession.get())
    this.render({
      logo: this.config.app.logo,
      menuConfig: buttons,
      loginUrl: this.api.url + this.api.resource.login,
      menuChannel: MENU_CHANNEL,
      loginChannel: LOGIN_CHANNEL
    })
  }

  sessionChange (session) {
    var userLogged = !!session
    this.render({userLogged: userLogged})
  }

  destroy () {
    this.menuSub.destroy()
    this.loginSub.destroy()
    gSession.removeListener(gSession.CHANGE, this.sessionChange)
  }
}

export default BackOfficeCtrl
