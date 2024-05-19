import prisma from "../prisma/client";

export default class ProductsToTags {
  // CREATE
  static async create({ input }) {
    const {
      product_id,
      tag_name,
    } = input;
    // console.log(product_id);
    // console.log(tag_name);
    // console.log(input);
    const productToTag = await prisma.productToTag.create({
      data: {
        product: {
          connect: { id: product_id },
        },
        tag: {
          connect: { name: tag_name },
        },
      },
    });
    // console.log(productToTag.product_id);
    return productToTag;
  }

  // DELETE
  static async delete({ input }) {
    const {
      product_id,
      tag_name,
    } = input;
    try {
      await prisma.productToTag.delete({
        where: {
          product_id_tag_name: {
            product_id,
            tag_name,
          },
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  static async findAll() {
    return prisma.productToTag.findMany();
  }
}
