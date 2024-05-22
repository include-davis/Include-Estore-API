import crypto from "crypto";
import prisma from "../prisma/client";

const bcrypt = require("bcryptjs");

const { PASSWORD_RESET_URL, HMAC_SECRET } = process.env;

export type Optional<T> = T | null | undefined;

export default class Authentication {
  /**
  * Retrieve email from database
  */
  static async findEmail({ email }) {
    try {
      return prisma.authentication.findFirstOrThrow({
        where: {
          email,
        },
      });
    } catch (e) {
      throw new Error("unable to find email");
    }
  }

  /**
  * Try logging in, check for nonexistent user email or incorrect password
  */
  static async login({ email, password }) {
    try {
      // Retrieve object from database with the email
      const emailObject = this.findEmail(email);
      const isPasswordValid = await bcrypt.compare(
        password as string,
        (await emailObject).password,
      );
      if (isPasswordValid === false) {
        throw new Error("email or password does not match");
      }
      if (emailObject === null) {
        throw new Error("user does not exist");
      }
      // use code from authToken middleware in the future (below is placeholder)
      // const token = jwt.sign(emailObject, process.env.JWT_SECRET, {
      //   expiresIn: `${authExpiration}h`,
      // });
      // cookies().set({
      //   name: "auth_token",
      //   value: token,
      //   expires: Date.now() + 100 * 360 * authExpiration,
      //   secure: true,
      // });
      // return NextResponse.json({ ok: true, emailObject }, { status: 200 });
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
  * Create a user with this method, check for pre-existing user email
  */
  static async register({ email, password }) {
    try {
      const salt = bcrypt.genSaltSync(5);
      const passwordHash = bcrypt.hashSync(password, salt);
      const emailObject = await this.findEmail(email);
      if (emailObject !== null) {
        // Put email and hashed password into db
        const newUser = {
          email,
          password: passwordHash,
        };

        const createNewUser = await prisma.authentication.create({ data: newUser });
        if (createNewUser !== null) {
          // use authToken middleware here in the future
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  /**
   * Get the current time
   * @return The number of milliseconds since the epoch
   */
  static getTimeNow(): number {
    return this.timeAfter(0);
  }

  /**
   * Get current time + x number of seconds
   * @param seconds The number of seconds
   * @return The number of milliseconds since the epoch
   */
  static timeAfter(seconds: number): number {
    return Math.floor(Date.now() / 1000) + seconds;
  }

  /**
   * Encodes the following properties in a stringify JSON
   * @param email The email
   * @param expiry The expiration time (the number of milliseconds since the epoch)
   * @return The encoded stringify JSON
   */
  static encodeData(email: string, expiry: number): string {
    return btoa(JSON.stringify({
      email, expiry,
    }));
  }

  /**
   * Decodes a stringify JSON into email and expiry properties
   * @param data The encoded stringify JSON
   * @return Decoded JSON object containing email and expiry fields
   */
  static decodeData(data: string): { email: string, expiry: number } {
    return JSON.parse(atob(data));
  }

  /**
   * Encodes the data and signature in the url
   * @param data The data
   * @param signature The signature
   * @return The url
   */
  static encodePasswordResetUrl(data: string, signature: string) {
    return `${PASSWORD_RESET_URL}?body=${data}&sig=${signature}`;
  }

  /**
   * Decodes the data and signature in the url
   * @param url The url
   * @return The associated data and signature
   */
  static decodePasswordResetUrl(url: string): { data: Optional<string>, signature: Optional<string> } {
    const parsedUrl = new URL(url);
    const queryParams = parsedUrl.searchParams;
    const data = queryParams.get("body");
    const signature = queryParams.get("sig");
    return { data, signature };
  }

  /**
   * Generates an HMAC signature with encoded data containing email and expiry date
   * @param data The email and expiry date encoded
   * @return The HMAC signature
   */
  static generateHMACSignature(data: string): string {
    return crypto.createHmac("sha256", HMAC_SECRET as string)
      .update(data)
      .digest("hex");
  }

  /**
   * Verifies the data and HMAC signature is not tampered with
   * @param data The email and expiry date encoded
   * @param signature The HMAC signature
   * @return true if verification successful, otherwise false
   */
  static verifyHMACSignature(data: string, signature: string) {
    try {
      const recreatedSignature = this.generateHMACSignature(data);
      const match = crypto.timingSafeEqual(
        Buffer.from(signature, "hex"),
        Buffer.from(recreatedSignature, "hex"),
      );

      const { expiry } = this.decodeData(data);
      if (this.getTimeNow() >= expiry) {
        return false;
      }

      return match;
    } catch {
      return false;
    }
  }

  /**
   * Send a reset password link
   * @param email The email to reset password for
   * @param expiry The expiration time (the number of milliseconds since the epoch), default 1 hour
   */
  static sendResetPasswordLink(email: string, expiry: number = this.timeAfter(3600)): string {
    const data = this.encodeData(email, expiry);
    const signature = this.generateHMACSignature(data);
    return `${PASSWORD_RESET_URL}?body=${data}&sig=${signature}`;
  }

  /**
   * Reset the password
   * @param url The URL used to reset the password
   * @param password The new password
   * @return true if successful, otherwise false
   */
  static resetPassword(url: string, password: string): boolean {
    try {
      const { data, signature } = this.decodePasswordResetUrl(url);

      if (!data || !signature) {
        return false;
      }

      if (!this.verifyHMACSignature(data, signature)) {
        return false;
      }

      const { email } = this.decodeData(data);

      return this.setPassword(email, password);
    } catch {
      return false;
    }
  }

  /**
   * Sets the password for email
   * @param email The email
   * @param password The password
   * @return true if successful, otherwise false
   */
  static setPassword(email: string, password: string): boolean {
    try {
      const salt = bcrypt.genSaltSync(5);
      const passwordHash = bcrypt.hashSync(password, salt);

      prisma.authentication.updateMany({
        where: {
          email,
        },
        data: {
          password: passwordHash,
        },
      });
      return true;
    } catch {
      return false;
    }
  }
}
