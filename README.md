# Simple File Management API

This Node.js project provides a simple file management API that allows users to upload, list, and delete files.

## Features

- **File Upload:** Users can upload files to the server.
- **List Files:** Users can retrieve a list of uploaded files.
- **Get specific file:** Users can retrieve any specific file for viewing.
- **Delete Files:** Users can delete specific files from the server.

## Technologies Used

- **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js:** A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Multer:** Middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- **fs:** Node.js built-in module for file system operations.
- **JWT (JSON Web Tokens):** A compact, URL-safe means of representing claims to be transferred between two parties. It's commonly used for authentication and information exchange in web services.
- **Crypto:** Node.js built-in module that provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.
- **Winston:** A versatile logging library for Node.js, which provides a simple and universal logging interface. It supports multiple transports (such as console, file, HTTP, etc.) and logging levels.
- **Helmet:** Express.js middleware to help secure your apps by setting various HTTP headers. It helps protect against well-known web vulnerabilities by setting appropriate HTTP headers.
- **dotenv:** A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

## Setup

1. Clone the repository:
   git clone https://github.com/asinghal2303/file_managment.git

2. Navigate to the project directory:
   cd file_managment/

3. Install dependencies:
   npm install

4. Create a `.env` file in the root directory of your project and add the following variables:
   PORT=3000
   JWT_SECRET_KEY='mysecretkey'
   ENCRYPTION_KEY='myencryptionkey'

Replace mysecretkey and myencryptionkey with your own secret keys.

5. Start the server:
   npm start

6. To access the API endpoints, you need to generate a token first. Use the following API endpoint to generate a dummy token:
   URL: /api/generateToken
   Method: GET
   Response: Returns a dummy JWT token that you can use to access the protected API endpoints.

Authorization: YOUR_DUMMY_TOKEN_HERE 7. Use the generated token in all subsequent requests by adding it to the headers as Authorization:

API Endpoints

1. Upload File
   URL: /api/upload
   Method: POST
   Request Body: Form data with a field named file containing the file to upload.
   Response: Returns a JSON object with details of the uploaded file.

2. List Files
   URL: /api/listFiles
   Method: GET
   Response: Returns a JSON array containing the list of uploaded files.

3. Delete File
   URL: /api/deleteFiles/:filename
   Method: POST
   Params: filename (the name of the file to delete)
   Response: Returns a JSON object indicating success or failure of the deletion operation.

4. View a spcific file
   URL: /api/files/:filename
   Method: POST
   Params: filename (the name of the file to view)
   Response: Returns a file indicating success or failure of the deletion operation.
