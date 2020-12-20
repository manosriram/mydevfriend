const crypto = require("crypto");

const decryptBuffer = (buffer, pass) => {
    try {
        var decipher = crypto.createDecipher("aes-128-cbc", pass);
        var finalDecrypted = decipher.update(buffer, "hex", "utf8");
        finalDecrypted += decipher.final("utf8");
        return finalDecrypted;
    } catch (err) {
        console.log(err);
    }
};

const encryptBuffer = (buffer, pass) => {
    try {
        const cipher = crypto.createCipher("aes-128-cbc", pass);
        var finalEncrypted = cipher.update(buffer, "utf8", "hex");
        finalEncrypted += cipher.final("hex");
        return finalEncrypted;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    decryptBuffer,
    encryptBuffer
};
