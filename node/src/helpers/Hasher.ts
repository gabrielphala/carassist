import bcrypt from "bcryptjs";
import crypto from "crypto"

export default new (class Hasher {
  hash = (str: string) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject("Something went wrong, try again later");

          return;
        }

        bcrypt.hash(str, salt, (err, hash) => {
          if (err) {
            reject("Something went wrong, try again later");

            return;
          }

          resolve(hash);
        });
      });
    });
  };

  isSame = (hash: string, plain: string) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plain, hash, (err, results) => {
        if (err) {
          reject("Something went wrong, try again later");

          return;
        }

        resolve(results);
      });
    });
  };

  signObject = (data, passPhrase = null) => {
    // Create parameter string
    let pfOutput = "";
    for (let [key, value] of data) {
      if (value !== "") {
        pfOutput += `${key}=${encodeURIComponent(`${value}`.trim()).replace(
          /%20/g,
          "+"
        )}&`;
      }
    }

    // Remove last ampersand
    let getString = pfOutput.slice(0, -1);
    if (passPhrase !== null) {
      getString += `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(
        /%20/g,
        "+"
      )}`;
    }

    return crypto.createHash("md5").update(getString).digest("hex");
  };
})();
