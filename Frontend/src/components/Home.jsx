import React, { useState } from 'react';
import { FaFileWord } from "react-icons/fa6";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaSun, FaMoon } from "react-icons/fa";
import axios from 'axios';

function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [conversionMessage, setConversionMessage] = useState('');
  const [isNightMode, setIsNightMode] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setProgress(0);
    setConversionMessage('');

    try {
      const response = await axios.post('http://localhost:3000/convertFile', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentCompleted);
        },
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${file.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setConversionMessage(`Your file "${file.name}" has been converted successfully!`);
    } catch (error) {
      console.error("Error uploading file:", error);
      setConversionMessage('An error occurred during conversion.');
    } finally {
      setLoading(false);
      setProgress(0); // Reset progress after completion
    }
  };

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <div className={`max-w-screen-2xl mx-auto container px-6 md:px-40 ${isNightMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex h-screen items-center justify-center">
        <div className={`border-2 border-dashed px-4 py-2 md:px-8 md:py-6 ${isNightMode ? 'border-gray-700' : 'border-indigo-700'} rounded-lg shadow-lg`}>
          <h1 className='text-3xl font-bold text-center mb-4'>Convert Word To PDF Online</h1>
          <p className="text-center text-sm mb-5"> 
            Easily convert Word documents to PDF format online, without having to install any software.
          </p>
          
          <div className="flex flex-col items-center space-y-4">
            <input type="file" accept='.doc,.docx' onChange={handleFileChange} className="hidden" id="FileInput" />
            <label htmlFor='FileInput' className={`w-full flex items-center justify-center px-4 py-6 ${isNightMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-700'} rounded-lg shadow-lg cursor-pointer border-blue-300 hover:bg-blue-700 duration-300 hover:text-white`}>
              <FaFileWord size={35} className="text-3xl mr-3" />
              <span className="text-2xl">
                {file ? file.name : "Choose File"}
              </span>
            </label>
            <button 
              onClick={handleFileUpload} 
              disabled={!file || loading} 
              className={`text-white ${isNightMode ? 'bg-blue-500 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} disabled:bg-gray-400 disabled:pointer-events-none duration-300 font-bold px-4 py-2 rounded-lg`}
            >
              {loading ? "Converting..." : "Convert File"}
            </button>

            {/* Progress Bar */}
            {loading && (
              <div className="w-full mt-4">
                <progress value={progress} max="100" className="w-full h-2 rounded-lg bg-blue-100" />
              </div>
            )}

            {/* Conversion Message Popup */}
            {conversionMessage && (
              <div className={`mt-4 p-3 ${isNightMode ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800'} rounded`}>
                {conversionMessage}
              </div>
            )}

            {/* Night Mode Toggle */}
            <button 
              onClick={toggleNightMode} 
              className={`mt-4 p-2 rounded-full shadow-md ${isNightMode ? 'bg-yellow-500' : 'bg-gray-300'} transition duration-300`}
            >
              {isNightMode ? <FaSun className="text-white" size={24} /> : <FaMoon className="text-gray-800" size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
