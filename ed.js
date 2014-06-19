/**
 * Copyright (c) 2014 Enrique Pineda
 */
var crypto = require('crypto');

function encrypt(secret, password) {
    var cipher = crypto.createCipher('aes192', password);
    var encrypted = cipher.update(secret, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

function decrypt(secret, password) {
    var decipher = crypto.createDecipher("aes192", password);
    var decrypted = decipher.update(secret, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;
