/**
 * Handles Login/Register mutations
 */
import express from "express";
import prisma from "../prisma/client";
import { createToken } from "../util/authToken";

const bcrypt = require("bcryptjs");

const setCookieRouter = express.Router();

/**
 *
 * @param token represents the JWT to be stored in the cookie
 */
function setCookie(token: any) {
  const expiration = Date.now() + 100 * 360 * 1;
  setCookieRouter.use((req, res) => {
    res.cookie("auth_token", token, {
      expires: new Date(expiration),
      path: "/",
      secure: true,
      httpOnly: true,
    });
    res.send("auth_token has been set.");
  });
}
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
      const token = createToken(emailObject);
      setCookie(token);
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
          const token = createToken(emailObject);
          setCookie(token);
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }
}
