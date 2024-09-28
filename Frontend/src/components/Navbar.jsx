import React from 'react'

function Navbar() {
  return (
    <div className='max-w-screen-2x1 mx-auto container px-4 md:px-40 shadow-lg h-16 max-w-full fixed'>
      <div className='flex justify-between'>
          <h1 className='text-2x1 cursor-pointer font-bold mt-1 py-3'>
            Word<span className='text-2xl text-green-500'>To</span>PDF
            </h1>
          <h1 className='text-2x1 cursor-pointer font-bold mt-1 px-3 py-5 hover:scale-125 duration-300'>Home</h1>
      </div>
    </div>
  )
}

export default Navbar
