-->  React Application To Convert Docx To PDF Online  <--
#Docx2pdf Converter...

# Word to PDF Converter

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
The **Word to PDF Converter** is a web application that allows users to convert Word documents (`.doc` and `.docx`) into PDF format easily. Built with React for the front end and Express.js for the back end, this application provides a user-friendly interface for document conversion.

## Features
- **User-Friendly Interface**: An intuitive design for seamless file uploads and downloads.
- **Document Conversion**: Effortlessly convert `.doc` and `.docx` files to PDF format.
- **Progress Indicator**: Visual feedback during file upload for better user experience.
- **Responsive Design**: Compatible with both desktop and mobile devices.

## Technologies Used
- **Front-End**: 
  - React
  - Axios
  - React Icons
  - Tailwind css
    
- **Back-End**: 
  - Node.js
  - Express.js
  - Multer (for handling file uploads)
  - docx-pdf (for document conversion)
 
    
- **Development Tools**: 
  - npm/yarn for package management
  - cors for enabling CORS

## Installation
To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Navigate to the back-end directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Start the back-end server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`.

4. Navigate to the front-end directory and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

5. Start the front-end application:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:3000`.

## Usage
1. Open the application in your web browser.
2. Click on the "Choose File" button to select a Word document from your computer.
3. Click on the "Convert File" button to upload and convert the document.
4. Wait for the conversion to complete. A download link will be generated for your converted PDF.
5. Click the download link to save the PDF to your device.

## API Endpoints
### POST `/convertFile`
- **Description**: Uploads a Word document and converts it to PDF.
- **Request Body**: 
  - Form-data with a single file input named `file`.
- **Response**: 
  - A PDF file of the converted document.

## Contributing
Contributions are welcome! If you have suggestions for improvements or want to add features, please fork the repository and create a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to adjust any parts of the README to better fit your project's style or to add any additional information!
