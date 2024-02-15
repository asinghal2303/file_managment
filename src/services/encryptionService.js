const fs = require('fs');
const crypto = require('crypto');
const path = require('path')

async function encryptFile(inputPath, outputPath, key) {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(inputPath);
      const writeStream = fs.createWriteStream(outputPath);
      const cipher = crypto.createCipher('aes-256-cbc', key);
  
      readStream.on('error', (err) => reject(err));
      writeStream.on('error', (err) => reject(err));
      writeStream.on('finish', () => resolve(true));
  
      readStream.pipe(cipher).pipe(writeStream);
    });
}

async function decryptFile(inputPath, key) {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(inputPath);
      const decipher = crypto.createDecipher('aes-256-cbc', key);
      let decryptedData = Buffer.alloc(0);
  
      readStream.on('error', (err) => reject(err));
      decipher.on('error', (err) => reject(err));
      decipher.on('data', (chunk) => {
        decryptedData = Buffer.concat([decryptedData, chunk]);
      });
      decipher.on('end', () => resolve(decryptedData));
  
      readStream.pipe(decipher);
    });
  }

module.exports = { encryptFile, decryptFile }