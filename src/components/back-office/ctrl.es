import { pubsub } from 'syn-core'
import buttons from '../../config/nav'

const CHANNEL = 'syn.backOffice.menuChannel'

/**
 * Main back office app controller
 */
class BackOfficeCtrl {

  constructor (onClick) {
    this.onClick = onClick
  }

  init (onClick) {
    this.pubsub = pubsub.channel.factory.create(CHANNEL, [ 'click' ])
    this.pubsub.click.subscribe(onClick)
    this.render({ menuConfig: buttons, channel: CHANNEL })
  }

  destroy () {
    this.pubsub.destroy()
  }
}

export default BackOfficeCtrl
