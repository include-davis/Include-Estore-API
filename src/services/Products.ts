import prisma from "../prisma/client";

export default class Products {
  // CREATE
  static async create({ input }: any) {
    const products = await prisma.products.create({
      data: input,
    });
    return products;
  }

  // READ
  static async find({ id }: any) {
    return prisma.products.findUnique({ where: { id } });
  }

  static async findAll({ ids }: any) {
    if (!ids) {
      return prisma.products.findMany();
    }
    return prisma.products.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  // UPDATE
  static async update({ id, input }: any) {
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
  static async delete({ id }: any) {
    try {
      await prisma.products.delete({
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
