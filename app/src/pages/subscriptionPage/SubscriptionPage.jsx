import {Fragment} from 'react'
import {Subscription} from '@components/subscription'

import './SubscriptionPage.css'

const SubscriptionPage = () => {
  return (
    <Fragment>
      <main id="sp-main">
        <Subscription />
      </main>
    </Fragment>
  )
}

export default SubscriptionPage