import React, { useState } from 'react';
import { FaFileWord } from "react-icons/fa6";
import axios from 'axios';

function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/convertFile', formData, {
        responseType: 'blob', // Important: This tells axios to expect a binary file
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Create a URL for the blob received from the server
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${file.name}.pdf`; // Name the downloaded file as the original file with .pdf extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-screen-2x1 mx-auto container px-6 md:px-40'>
      <div className="flex h-screen items-center justify-center">
        <div className="border-2 border-dashed px-4 py-2 md:px-8 md:py-6 border-indigo-700 rounded-lg shadow-lg">
          <h1 className=' text-3xl font-bold text-center mb-4'>Convert Word To PDF Online</h1>
          <p className="text-center text-sm mb-5"> 
            Easily convert Word documents to PDF format online, without having to install any software.
          </p>
          
          <div className="flex flex-col items-center space-y-4">
            <input type="file" accept='.doc,.docx' onChange={handleFileChange} className="hidden" id="FileInput" />
            <label htmlFor='FileInput' className="w-full flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-700 rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white">
              <FaFileWord size={35} className="text-3xl mr-3" />
              <span className="text-2xl">
                {file ? file.name : "Choose File"}
              </span>
            </label>
            <button 
              onClick={handleFileUpload} 
              disabled={!file || loading} 
              className="text-white bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg"
            >
              {loading ? "Converting..." : "Convert File"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
