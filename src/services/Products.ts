import prisma from "../prisma/client";
import { ProductInput } from "../types/Product";

export default class Products {
  // CREATE
  static async create(input: ProductInput) {
    const products = await prisma.product.create({
      data: input,
    });
    return products;
  }

  // READ
  static async find(id: string) {
    return prisma.product.findUnique({ where: { id } });
  }

  static async findAll(ids: [string]) {
    if (!ids) {
      return prisma.product.findMany();
    }

    return prisma.product.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  // UPDATE
  static async update(id: string, input: ProductInput) {
    try {
      const user = await prisma.product.update({
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
  static async delete(id: string) {
    try {
      await prisma.product.delete({
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
