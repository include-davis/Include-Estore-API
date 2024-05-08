import prisma from "../prisma/client";

export default class Users {
  // CREATE
  static async create({ input }) {
    const user = await prisma.user.create({
      data: input,
    });
    return user;
  }

  // READ
  static async find({ id }) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  static async findMany({ ids }) {
    if (!ids) {
      return prisma.user.findMany();
    }
    return prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  // UPDATE
  static async update({ id, input }) {
    try {
      const user = await prisma.user.update({
        where: {
          id,
        },
        data: input,
      });
      return user;
    } catch (e) {
      return null;
    }
  }

  // DELETE
  static async delete({ id }) {
    try {
      await prisma.user.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
