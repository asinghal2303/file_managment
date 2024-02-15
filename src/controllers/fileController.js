const path = require('path');
const fs = require('fs');

const mime = require('mime-types');

const fileService = require('../services/fileHandleServices');
const { decryptFile } = require('../services/encryptionService');
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

const PATH_TO_UPLOAD = path.join(__dirname, '../../uploads');

exports.uploadFiles = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const inputFile = req.file.path;

    const encryptedFileName = await fileService.uploadFiles(inputFile, ENCRYPTION_KEY);
    res.send(`File uploaded and encrypted successfully. Encrypted file name: ${encryptedFileName}`);
  } catch (error) {
    next(error)
  }
}

exports.listFiles = async (req, res, next) => {

  try {
    const filesResult = await fileService.listFiles();
    if(filesResult.statusCode === 200) {
      res.json(filesResult.result);
    }
  } catch (err) {
    next(err)
  }
}

exports.deleteFiles = async (req, res, next) => {
  const filename = req.params.filename;
  try {
    const deleteResult = await fileService.deleteFiles(filename);
    if(deleteResult.statusCode === 200) {
      return res.status(200).send(`Deleted file ${filename} successfully`);
    }

    if(deleteResult.statusCode === 400) {
        return res.status(400).send('Invalid filename');
    }
  } catch (error) {
    next(error)
  }
}

exports.getFile = async (req, res, next) => {
  try {
    const filename = req.params.filename;
    const filePath = path.join(PATH_TO_UPLOAD, filename);

    if (fs.existsSync(filePath)) {
      const decryptedData = await decryptFile(filePath, ENCRYPTION_KEY);

      res.setHeader('Content-Type', mime.lookup(filePath));
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-Length', decryptedData.length);

      res.status(200).send(decryptedData);
    } else {
      res.status(404).send(`404 – File ${filename} not found.`);
    }
  } catch (error) {
    next(error)
  }
}