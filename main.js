const fs = require('fs');
const path = require('path');
const { encrypt, decrypt } = require('./encryption/encryption');
const { generateKeyPair } = require('./encryption/key_management');

function ensureDirectoryExists(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
}

function saveProfilePicture(filePath, publicKey) {
  const data = fs.readFileSync(filePath); // Read the file data
  const encryptedData = encrypt(data, publicKey); // Encrypt the file data

  // Create the directory if it doesn't exist
  ensureDirectoryExists('./encrypted-profile/');

  // Save the encrypted data to a file with a unique name or store it in a database
  const encryptedFilePath = './encrypted-profile/images.jpg';
  fs.writeFileSync(encryptedFilePath, encryptedData);

  // Return the encrypted file path or store it in the user's profile
  return encryptedFilePath;
}

function getProfilePicture(encryptedFilePath, privateKey) {
  const encryptedData = fs.readFileSync(encryptedFilePath); // Read the encrypted file data
  const decryptedData = decrypt(encryptedData, privateKey); // Decrypt the file data

  // Create the directory if it doesn't exist
  ensureDirectoryExists('./decrypted-profiles/');

  // Save the decrypted data to a file with a unique name or directly use it in your application
  const decryptedFilePath = './decrypted-profiles/profile-picture.png';
  fs.writeFileSync(decryptedFilePath, decryptedData);

  // Return the decrypted file path or use it in your application
  return decryptedFilePath;
}

function main() {
  // Generate encryption key pair
  const { publicKey, privateKey } = generateKeyPair();

  // Example file paths
  const profilePicturePath = './profile-pictures/baba.jpg';

  // Save profile picture and get encrypted file path
  const encryptedFilePath = saveProfilePicture(profilePicturePath, publicKey);
  console.log('Encrypted Profile Picture:', encryptedFilePath);

  // Get profile picture and get decrypted file path
  const decryptedFilePath = getProfilePicture(encryptedFilePath, privateKey);
  console.log('Decrypted Profile Picture:', decryptedFilePath);
}

main();
