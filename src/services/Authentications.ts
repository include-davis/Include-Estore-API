import bcrypt from "bcryptjs";
import prisma from "../prisma/client";

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
}
