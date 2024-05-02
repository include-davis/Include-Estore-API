/**
 * Handles Login/Register mutations
 */
// import express from "express";
import { GraphQLError } from "graphql";
import prisma from "../prisma/client";
import { createToken } from "../util/authToken";

const bcrypt = require("bcryptjs");

const expireTime = Date.now() + 100 * 360 * 1;

/**
 *
 * @param token represents the JWT to be stored in the cookie
 */
function setCookie(data: any, res: any, expiration: number) {
  res.cookie("auth_token", createToken(data), {
    expires: new Date(expiration),
    path: "/",
    secure: true,
    httpOnly: true,
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
      throw new GraphQLError("Unable to find email.", {
        extensions: {
          code: "NOT_FOUND",
        },
      });
    }
  }

  /**
  * Try logging in, check for nonexistent user email or incorrect password
  */
  static async login({ email, password, res }) {
    try {
      // Retrieve object from database with the email
      const user = this.findEmail(email);
      const isPasswordValid = await bcrypt.compare(
        password as string,
        (await user).password,
      );
      if (isPasswordValid === false) {
        throw new Error("email or password does not match");
      }
      if (user === null) {
        throw new Error("user does not exist");
      }
      setCookie(user, res, expireTime);
      return user; // return user object
    } catch (e) {
      /**
       * for error handling, try sending back a graphql error
      (or just some way that the err shows up on front end) instead of returning false */
      throw new GraphQLError("Cannot login.", {
        extensions: {
          code: "NOT_FOUND",
        },
      });
    }
  }

  /**
  * Create a user with this method, check for pre-existing user email
  */
  static async register({ email, password, res }) {
    try {
      // Password stored as a hash, with editable salt from ENV file
      const passwordHash = bcrypt.hashSync(password, process.env.EDITABLE_SALT);
      const user = await this.findEmail(email);
      if (user !== null) {
        // Put email and hashed password into db
        const newUser = {
          email,
          password: passwordHash,
        };

        const createNewUser = await prisma.authentication.create({ data: newUser });
        if (createNewUser !== null) {
          setCookie(user, res, expireTime);
          return true;
        }
      }
      return user;
    } catch (e) {
      throw new GraphQLError("Cannot login.", {
        extensions: {
          code: "NOT_FOUND",
        },
      });
    }
  }
}
