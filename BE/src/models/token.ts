import JWT from "jsonwebtoken";

export class TokenModel {
  generateToken = (length: number) => {
    const CHARACTERS =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(
        ""
      );

    let arr: string[] = [];

    for (let i = 0; i < length; i++) {
      const j = parseInt((Math.random() * (CHARACTERS.length - 1)).toFixed(0));
      arr[i] = CHARACTERS[j];
    }

    return arr.join("");
  };

  generalAuthTokens = (userId: string) => {
    return JWT.sign(
      {
        iss: "tluxury",
        sub: userId,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 3),
      },
      "TLuxuryAuthorization"
    );
  };
}
