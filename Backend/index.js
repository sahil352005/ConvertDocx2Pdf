const express = require('express');
const multer = require('multer');
const cors = require('cors');
const docxToPdf = require('docx-pdf');
const path = require("path");
const fs = require('fs');
const app = express();
const port = 3000;
app.use(cors());
// Ensure 'uploads' and 'files' directories exist
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'));
}
if (!fs.existsSync(path.join(__dirname, 'files'))) {
  fs.mkdirSync(path.join(__dirname, 'files'));
}

// Multer storage setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Endpoint to convert DOCX to PDF
app.post('/convertFile', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No File Uploaded" });
    }

    const inputPath = req.file.path;
    const outputFile = `${path.parse(req.file.originalname).name}.pdf`; // Create proper .pdf file name
    const outputPath = path.join(__dirname, "files", outputFile);

    // Convert DOCX to PDF
    docxToPdf(inputPath, outputPath, (err) => {
      if (err) {
        console.error("Conversion error:", err);
        return res.status(500).json({ message: "Error Converting DOCX to PDF" });
      }

      // Send the PDF file as a download response
      res.setHeader('Content-Disposition', `attachment; filename="${outputFile}"`);
      res.setHeader('Content-Type', 'application/pdf');
      res.download(outputPath, (downloadErr) => {
        if (downloadErr) {
          console.error("File download error:", downloadErr);
        } else {
          console.log("File Downloaded successfully:", outputFile);
        }
      });
    });

  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
