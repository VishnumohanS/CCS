const CryptoJS = require('crypto-js');

const encrypt = (data) => {
  return CryptoJS.AES.encrypt(data, process.env.AES_SECRET).toString();
};

const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.AES_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const generateHash = (data) => {
  return CryptoJS.SHA256(data).toString();
};

module.exports = { encrypt, decrypt, generateHash };
