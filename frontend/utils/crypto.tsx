import CryptoJS from 'crypto-js';

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY as string;

if (!secretKey) {
  throw new Error('no secret key found');
}

console.log('secret key :', secretKey);

export const encryptData = (data: string): string => {
  const ciphertext = CryptoJS.AES.encrypt(data, secretKey).toString();
  console.log('ciphertext :', ciphertext);
  return ciphertext;
};

export const decryptData = (encryptedData: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    console.log("bytes :", bytes);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log('original texte :', originalText);
    return originalText;
  } catch (error) {
    console.error('Erreur décryptage:', error);
    return '';
  }
};
