import * as CryptoJS from 'crypto-js';

export const zenCafeApiUrl = process.env.REACT_APP_ZEN_CAFE_API_URL;
const zenCafeApiKey = process.env.REACT_APP_ZEN_CAFE_API_KEY;
const zenCafeEncryptionKey = process.env.REACT_APP_ZEN_CAFE_ENCRYPTION_KEY;
export const encryptedZenCafeApiKey = CryptoJS.AES.encrypt(`${zenCafeApiKey}`, `${zenCafeEncryptionKey}`).toString();

console.log("zenCafeApiUrl: ", zenCafeApiUrl);
console.log("zenCafeApiKey: ", zenCafeApiKey);
console.log("zenCafeEncryptionKey: ", zenCafeEncryptionKey);
console.log("encryptedZenCafeApiKey: ", encryptedZenCafeApiKey);

//https://stackoverflow.com/questions/53237293/react-evironment-variables-env-return-undefined very important