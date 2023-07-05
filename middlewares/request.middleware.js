const crypto = require('crypto');
// const https = require('https');
const xml2js = require('xml2js');
// const express = require('express');
// const router = express.Router();

// Encryption key and initialization vector (IV)
const encryptionKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// Encryption function
function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function encryptionMiddleware(req, res, next) {
    // Retrieve the request body from req.body
    const requestBody = req.body;
  
    // Convert request body to XML string
    const builder = new xml2js.Builder();
    // console.log(builder);
    const xmlData = builder.buildObject(requestBody);

// Convert XML data to JSON string
xml2js.parseString(xmlData, (err, result) => {
  if (err) {
    console.error('Failed to parse XML:', err);
    return res.status(400).send('Invalid request format');
  }

  const jsonRequestData = JSON.stringify(result);

  // Encrypt the request data
  const encryptedData = encrypt(jsonRequestData);

  // Prepare the encrypted request
  const encryptedRequest = {
    data: encryptedData,
    iv: iv.toString('hex')
  };

  // Convert the encrypted request to XML string
  const encryptedXmlRequest = builder.buildObject(encryptedRequest);

  // Set the encrypted request as the new request body
  req.body = encryptedXmlRequest;

  // Continue to the next middleware or route handler
  next();
});
};

module.exports = { encryptionMiddleware };