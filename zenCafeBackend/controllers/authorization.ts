import * as CryptoJS from 'crypto-js';

require('dotenv').config();

const apiKey = process.env.API_KEY;
const encryptionKey = process.env.ENCRYPTION_KEY;

export function authorize(req: any): boolean {
    const authorizationHeader = req.headers.authorization;
    const encryptedZenCafeApiKey = authorizationHeader; // No need for "Bearer"
    const decryptedApiKey = CryptoJS.AES.decrypt(encryptedZenCafeApiKey, `${encryptionKey}`).toString(CryptoJS.enc.Utf8);
    return decryptedApiKey == apiKey;
}