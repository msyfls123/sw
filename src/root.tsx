import React, { FunctionComponent, Suspense, lazy } from 'react'
const Day = lazy(() => import('./components/Day'))

const Root: FunctionComponent = () => {
  return (
    <div>
      <h1>A New Day</h1>
      <Suspense fallback={<>loading</>}>
        <Day/>
      </Suspense>
    </div>
  )
}

export default Root
