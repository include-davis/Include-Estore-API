// eslint-disable-next-line import/no-extraneous-dependencies
import { cookies } from "next/headers";
// eslint-disable-next-line import/no-extraneous-dependencies
import { NextResponse } from "next/server";
import prisma from "../prisma/client";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authExpiration = 3;

export default class Authentication {
  // READ
  static async findEmail({ email }) {
    try {
      return prisma.authentication.findFirstOrThrow({
        where: {
          email,
        },
      });
    } catch (e) {
      throw new Error("something went wrong");
    }
  }

  // Try logging in, check for nonexistent user email or incorrect password
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
      const token = jwt.sign(emailObject, process.env.JWT_SECRET, {
        expiresIn: `${authExpiration}h`,
      });
      cookies().set({
        name: "auth_token",
        value: token,
        expires: Date.now() + 100 * 360 * authExpiration,
        secure: true,
      });
      return NextResponse.json({ ok: true, emailObject }, { status: 200 });
    } catch (e) {
      return false;
    }
  }

  // CREATE
  // Try registering, check for pre-existing user email
  static async register({ email, password }) {
    try {
      const isEmailExist = await this.findEmail(email);
      if (isEmailExist !== null) {
        // Put email and hashed password into db
      }
    } catch (e) {
      return false;
    }
  }

  // UPDATE
}
