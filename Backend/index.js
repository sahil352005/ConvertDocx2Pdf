const express = require('express');
const multer = require('multer');
const docxToPdf = require('docx-pdf');
const path = require("path");
const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.post('/convertFile', upload.single('file'), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No File Uploaded",
      });
    }

    const inputPath = req.file.path;
    const outputFile = `${req.file.originalname}.pdf`;
    const outputPath = path.join(__dirname, "files", outputFile);

    docxToPdf(inputPath, outputPath, (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).json({
          message: "Error Converting docx to pdf",
        });
      }

      res.setHeader('Content-Disposition', `attachment; filename="${outputFile}"`);
      res.setHeader('Content-Type', 'application/pdf');
      res.download(outputPath, () => {
        console.log("File Downloaded");
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});