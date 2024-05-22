/**
 * Handles Login/Register mutations
 */
// import express from "express";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import prisma from "../prisma/client";
import { createToken } from "../util/authToken";

export default class Authentication {
  /**
  * Retrieve email from database
  */
  static async findEmail(userEmail) {
    return prisma.authentication.findFirst({
      where: {
        email: userEmail as string,
      },
    });
  }

  /**
  * Try logging in, check for nonexistent user email or incorrect password
  */
  static async login({ email, password, res }) {
    // try {
    // Retrieve object from database with the email
    const user = await this.findEmail(email);
    if (user == null) {
      throw new GraphQLError("Cannot login, nonexistent user.", {
        extensions: {
          code: "NOT_FOUND",
        },
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      (await user).password,
    );
    if (isPasswordValid === false) {
      throw new GraphQLError("Cannot login, wrong password.", {
        extensions: {
          code: "WRONG_PASSWORD",
        },
      });
    }
    res.cookie("auth_token", createToken(user).body, {
      httpOnly: true, secure: true, sameSite: "Strict",
    });
    return user; // return user object
  }

  /**
  * Create a user with this method, check for pre-existing user email
  */
  static async register({ email, password, res }) {
    // Password stored as a hash, with editable salt from ENV file
    // edit salt so that it includes rounds
    const user = await this.findEmail(email);
    if (user == null) {
      const salt = bcrypt.genSaltSync(Number(process.env.EDITABLE_SALT));
      const passwordHash = bcrypt.hashSync(password, salt);
      // Put email and hashed password into db
      const newUser = {
        email,
        password: passwordHash as string,
      };

      const createNewUser = await prisma.authentication.create({ data: newUser });
      if (createNewUser !== null) {
        res.cookie("auth_token", createToken(newUser).body, {
          httpOnly: true, secure: true, sameSite: "Strict",
        });
        return newUser;
      }
    }
    throw new GraphQLError("Cannot register", {
      extensions: {
        code: "USER_EXISTS",
      },
    });
  }
}
