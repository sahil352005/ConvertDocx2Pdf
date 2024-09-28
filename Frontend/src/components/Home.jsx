import React, { useState } from 'react'
import { FaFileWord } from "react-icons/fa6";

function Home() {
  const [file, setFile] = useState(null)

  const handlefileChange = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <>
      <div className='max-w-screen-2x1 mx-auto container px-6 md:px-40'>
        <div className="flex h-screen items-center justify-center  ">
          <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-700 rounded-lg shadow-lg ">
            <h1 className=' text-3xl font-bold text-center mb-4 '>Convert Word To PDF Online</h1>
            <p className="text-center text-sm mb-5 "> 
              Easily Convert Word documents TO PDF format online, without having to install any software.
            </p>
            
            <div className="flex flex-col items-center space-y-4">
              <input type="file" accept='.doc,.docx' onChange={handlefileChange} className="hidden" id="FileInput"/>
              <label htmlFor='FileInput' className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white ">
                <FaFileWord size={35} className="text-3xl mr-3"  />
                <span className="text-2xl">
                  {file ? (
                    <>
                      {file.name}
                    </>
                  ) : (
                    <span>Choose File</span>
                  )}
                </span>
              </label>
              <button disabled={!file} className="text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400    disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg">Convert File</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home