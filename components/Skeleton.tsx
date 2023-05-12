import React from 'react'

const Skeleton = () => {
  return (
    <div role="status" className="max-w-sm sm:max-w-md animate-pulse">
      <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full  max-w-[340px] sm:max-w-[400px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  max-w-[310px] sm:max-w-[370px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  max-w-[280px] sm:max-w-[340px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  max-w-[340px] sm:max-w-[400px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Skeleton
