const crypto = require('crypto');

function encrypt(data, publicKey) {
  const symmetricKey = crypto.randomBytes(32); // Generate a 32-byte symmetric encryption key
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', symmetricKey, iv);
  let encryptedData = cipher.update(data, 'utf8', 'hex');
  encryptedData += cipher.final('hex');

  // Encrypt the symmetric key with the public key
  const encryptedKey = crypto.publicEncrypt(publicKey, symmetricKey).toString('hex');

  return iv.toString('hex') + encryptedData + encryptedKey;
}

function decrypt(ciphertext, privateKey) {
  const iv = Buffer.from(ciphertext.slice(0, 32), 'hex');
  const encryptedData = ciphertext.slice(32, -256);
  const encryptedKey = Buffer.from(ciphertext.slice(-256), 'hex');

  // Decrypt the symmetric key with the private key
  const symmetricKey = crypto.privateDecrypt(privateKey, encryptedKey);

  const decipher = crypto.createDecipheriv('aes-256-cbc', symmetricKey, iv);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  
  return decryptedData;
}

module.exports = { encrypt, decrypt };
