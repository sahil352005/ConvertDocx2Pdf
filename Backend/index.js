const express = require('express');
const multer = require('multer');
const cors = require('cors');
const docxToPdf = require('docx-pdf');
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(cors());

// Ensure uploads and files directories exist
const ensureDirectories = () => {
  const uploadDir = path.join(__dirname, 'uploads');
  const filesDir = path.join(__dirname, 'files');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
  }
};
ensureDirectories();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
//using multer for temporary storing the file on local
const upload = multer({ storage: storage });

app.post('/convertFile', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No File Uploaded",
      });
    }

    //const inputPath = req.file.path;
    const inputPath = req.file.path;
    const outputFile = `${req.file.originalname}.pdf`;
    const outputPath = path.join(__dirname, "files", outputFile);

    // Convert DOCX to PDF using docxtopdf
    docxToPdf(inputPath, outputPath, (err) => {
      if (err) {
        console.error("Conversion Error:", err);
        return res.status(500).json({
          message: "Error Converting DOCX to PDF",
        });
      }

      // Send the converted PDF as a response from here
      res.setHeader('Content-Disposition', `attachment; filename="${outputFile}"`);
      res.setHeader('Content-Type', 'application/pdf');
      res.download(outputPath, (err) => {
        if (err) {
          console.error("Download Error:", err);
          return res.status(500).json({
            message: "Error Downloading File",
          });
        } else {
          console.log("File Downloaded");

          // Cleanup files after download
          fs.unlinkSync(inputPath); // Remove uploaded DOCX file from here
          fs.unlinkSync(outputPath); // Remove converted PDF file from here
        }
      });
    });
  } catch (error) {
    console.error("Error in /convertFile:", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
