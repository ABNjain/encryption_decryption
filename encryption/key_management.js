const crypto = require('crypto');

function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  return { publicKey, privateKey };
}

function saveKeyToFile(key, filePath) {
  fs.writeFileSync(filePath, key);
}

function loadKeyFromFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

module.exports = { generateKeyPair, saveKeyToFile, loadKeyFromFile };
