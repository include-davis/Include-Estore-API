import prisma from "../prisma/client";

export default class ProductsToTags {
  // CREATE
  static async create({ input }) {
    const {
      productId,
      tagId,
    } = input;
    const productToTag = await prisma.productToTag.create({
      data: {
        product: {
          connect: { id: productId },
        },
        tag: {
          connect: { id: tagId },
        },
      },
    });
    return productToTag;
  }

  // DELETE
  static async delete({ id }) {
    try {
      await prisma.productToTag.delete({
        where: {
          product_id: id,
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
