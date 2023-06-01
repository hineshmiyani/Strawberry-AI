import React from 'react'

const Skeleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse sm:max-w-md">
      <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200"></div>
      <div className="mb-2.5 h-2 max-w-[340px]  rounded-full bg-gray-200 sm:max-w-[400px]"></div>
      <div className="mb-2.5 h-2 rounded-full  bg-gray-200"></div>
      <div className="mb-2.5 h-2 max-w-[310px]  rounded-full bg-gray-200 sm:max-w-[370px]"></div>
      <div className="mb-2.5 h-2 max-w-[280px]  rounded-full bg-gray-200 sm:max-w-[340px]"></div>
      <div className="h-2 max-w-[340px] rounded-full  bg-gray-200 sm:max-w-[400px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default Skeleton
