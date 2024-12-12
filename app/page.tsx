import React from 'react'

import TextEnhancementToolbar from '@/components/TextEnhancementToolbar'
import TextAreaContainer from '@/components/TextArea/TextAreaContainer'

const Home = () => {
  return (
    <div className="mx-auto max-w-[1296px] px-4 pb-5 pt-0 sm:pt-3  lg:pb-3">
      <div className="z-1 min-h-auto relative h-[calc(100dvh-100px)] w-full overflow-hidden rounded-2xl border  border-solid border-[#d2d9ee] bg-white p-2 drop-shadow-xl lg:h-[calc(100dvh-176px)]">
        <TextEnhancementToolbar />
        <TextAreaContainer />
      </div>
    </div>
  )
}

export default Home
