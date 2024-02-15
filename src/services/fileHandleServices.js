const fs = require('fs');
const path = require('path');

const PATH_TO_UPLOAD = path.join(__dirname, '../../uploads');
const fileUploadHelper = require('../utils/fileUpload');
const { encryptFile } = require('./encryptionService');
const logger = require('../middleware/loggerMiddleware');


exports.listFiles = async () => {
    const folderPath = 'uploads';

    try {
      const files = await fs.promises.readdir(folderPath);
     
      const fileStats = [];
      for (const file of files) {
        const filePath = path.join(folderPath, file);
        try {
          const stats = await fs.promises.stat(filePath);
          fileStats.push({
            name: file,
            isDirectory: stats.isDirectory(),
            size: stats.size,
            createdAt: stats.birthtime,
            modifiedAt: stats.mtime
          });
        } catch (error) {
          logger.error(`Error while processing file ${filePath}: ${error}`);
          throw new Error(`Error while processing file ${filePath}: ${error}`)
        }
      }
  
      return {statusCode: 200, message: 'Successfully fetched all files', result: fileStats};
    } catch (error) {
      console.error('Error listing files:', error);
      throw new Error('Failed to list files');
    }
}

exports.deleteFiles = async (filename) => {
    const filePath = path.join(PATH_TO_UPLOAD, filename);
    console.log('filePath', filePath)
  
    if (!fileUploadHelper.isValidFilename(filename)) {
      return {statusCode: 400, message: 'Invalid filename.'}
    }
    
    try {
        await fs.promises.unlink(filePath);
        return {statusCode: 200, message: 'Deleted file successfully'}
    } catch (err) {
        logger.error('Failed to delete file')
        throw new Error('Failed to delete file');
    }
}

exports.uploadFiles = async (inputFile, encryptionKey) => {
    const encryptedFileName = Date.now() + '-encrypted-' + path.basename(inputFile);
    const encryptedFilePath = path.join(PATH_TO_UPLOAD, encryptedFileName);
  
    try {
        await encryptFile(inputFile, encryptedFilePath, encryptionKey);
        fs.unlink(inputFile, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
            throw new Error('Error deleting original file.');
          }
        });
        return encryptedFileName;
      } catch (error) {
        logger.error('Error occurred during file upload and encryption:', error);
        throw new Error('Failed to upload and encrypt file');
      }
}