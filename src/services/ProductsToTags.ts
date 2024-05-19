import prisma from "../prisma/client";

export default class ProductsToTags {
  // CREATE
  static async create({ input }) {
    // const {
    //   productId,
    //   tagName,
    // } = input;
    // console.log(productId);
    // console.log(tagName);
    // console.log(input);
    const productToTag = await prisma.productToTag.create({
      data: {
        product: {
          connect: { id: input.product_id },
        },
        tag: {
          connect: { name: input.tag_name },
        },
      },
    });
    // console.log(productToTag.product_id);
    return productToTag;
  }

  // DELETE
  static async delete({ input }) {
    // const {
    //   productId,
    //   tagName,
    // } = input;
    // console.log(input.product_id);
    // console.log(input.tag_name);
    try {
      await prisma.productToTag.delete({
        where: {
          product_id_tag_name: {
            product_id: input.product_id,
            tag_name: input.tag_name,
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
