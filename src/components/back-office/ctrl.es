import { pubsub } from 'syn-core'
import buttons from '../../config/nav'
import Navigation from '../../lib/nav'
import states from '../../config/states'

const CHANNEL = 'syn.backOffice.menuChannel'

/**
 * Main back office app controller
 */
class BackOfficeCtrl {

  constructor (onClick) {
    this.onClick = onClick
    this.nav = Navigation.getInstance()
  }

  init (onClick) {
    this.nav.setStates(states)
    this.pubsub = pubsub.channel.factory.create(CHANNEL, [ 'click' ])
    this.pubsub.click.subscribe(onClick)
    this.render({ menuConfig: buttons, channel: CHANNEL })
  }

  destroy () {
    this.pubsub.destroy()
  }
}

export default BackOfficeCtrl
