import React, { Suspense } from 'react'

const customizedLoading = <div>loading</div> // set customized loading dom here

export default Component => {
  return props => (
    <Suspense fallback={customizedLoading}>
      <Component {...props} />
    </Suspense>
  )
}
