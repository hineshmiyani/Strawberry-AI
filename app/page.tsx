import React from 'react'
import TextEnhancementToolbar from '@/components/TextEnhancementToolbar'
import TextAreaContainer from '@/components/TextAreaContainer'

const Home = () => {
  return (
    <div className="px-4  pt-0 sm:pt-3 pb-5 lg:pb-3 max-w-[1296px]  mx-auto">
      <div className="p-2 relative bg-white rounded-2xl z-1 border border-solid border-[#d2d9ee]  min-h-auto h-[calc(100dvh-100px)] lg:h-[calc(100dvh-176px)] w-full drop-shadow-xl overflow-hidden">
        <TextEnhancementToolbar />
        <TextAreaContainer />
      </div>
    </div>
  )
}

export default Home
