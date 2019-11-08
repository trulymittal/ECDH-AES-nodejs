const crypto = require('crypto');

const alice = crypto.createECDH('secp256k1');
alice.generateKeys();

const bob = crypto.createECDH('secp256k1');
bob.generateKeys();

const alicePublicKeyBase64 = alice.getPublicKey().toString('base64');
const bobPublicKeyBase64 = bob.getPublicKey().toString('base64');

const aliceSharedKey = alice.computeSecret(bobPublicKeyBase64, 'base64', 'hex');
const bobSharedKey = bob.computeSecret(alicePublicKeyBase64, 'base64', 'hex');

console.log(aliceSharedKey === bobSharedKey);
console.log('Alice shared Key: ', aliceSharedKey);
console.log('Bob shared Key: ', bobSharedKey);

const aes256 = require('aes256');
const message = 'this is some random message...';
//Alice will encrypt this message using AES256 and her shared key...
const encrypted = aes256.encrypt(aliceSharedKey, message);

// Now somehow tranfer this message to bob, using your server or something like that...

//Now bob has the message and he can use his shared key to decrypt the message...
const decrypted = aes256.decrypt(bobSharedKey, encrypted);

//Logging in the values...finally...
console.table({ encrypted, decrypted });
