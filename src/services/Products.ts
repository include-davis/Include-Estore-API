import { Prisma } from "@prisma/client";
import prisma from "../prisma/client";

// Define the structure of your input here, matching Prisma's ProductCreateInput
type CreateProductInput = Prisma.ProductCreateInput;

type UpdateProductInput = Prisma.ProductUpdateInput;

type FindProductArgs = {
  id: string;
};

type FindAllProductArgs = {
  ids?: string[];
};

export default class Products {
  // CREATE
  static async create({ input }: { input: CreateProductInput }) {
    const products = await prisma.product.create({
      data: input,
    });
    return products;
  }

  // READ
  static async find({ id }: FindProductArgs) {
    return prisma.product.findUnique({ where: { id } });
  }

  static async findAll({ ids }: FindAllProductArgs) {
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
  static async update({ id, input }: { id: string; input: UpdateProductInput }) {
    try {
      const product = await prisma.product.update({
        where: {
          id,
        },
        data: input,
      });
      return product;
    } catch (e) {
      return null;
    }
  }

  // DELETE
  static async delete({ id }: FindProductArgs) {
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
