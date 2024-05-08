import prisma from "../prisma/client";

export default class Tags {
  // CREATE
  static async create({ input }) {
    const tag = await prisma.tag.create({
      data: input,
    });
    return tag;
  }

  // DELETE
  static async delete({ id }) {
    try {
      await prisma.tag.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  // READ
  static async find({ id }) {
    return prisma.tag.findUnique({ where: { id } });
  }

  static async findName({ name }) {
    return prisma.tag.findUnique({ where: { name } });
  }

  static async findAll({ ids }) {
    if (!ids) {
      return prisma.tag.findMany();
    }
    return prisma.tag.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  static async findProducts({ id }) {
    return prisma.product.findMany({
      where: {
        tags: {
          some: {
            tag: {
              id,
            },
          },
        },
      },
    });
  }
}
