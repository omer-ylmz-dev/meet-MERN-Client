import CryptoJS from 'crypto-js';
import { jwtDecode } from "jwt-decode";


export const encryptData = (data) => {
	const encrypted = CryptoJS.AES.encrypt(data, import.meta.env.VITE_CRYPTO_SECRET_KEY).toString();
	return encrypted
}
	
export const decryptData = (data) => {
	const decrypted = CryptoJS.AES.decrypt(data, import.meta.env.VITE_CRYPTO_SECRET_KEY).toString(CryptoJS.enc.Utf8);
	return decrypted
}

export const decodeJWT = (data) => {
	const decoded = jwtDecode(data)
	return decoded
}