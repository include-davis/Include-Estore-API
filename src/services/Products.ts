import prisma from "../prisma/client";

export default class Products {
  // CREATE
  static async create({ input }) {
    const {
      name,
      price,
      description,
      details,
      weight,
      height,
      width,
      depth,
      specialLabelNeeded,
    } = input;
    const product = await prisma.product.create({
      data: {
        name,
        inventory: {
          create: {
            available_quantity: 0,
            cost_of_production: 0,
            lead_time: 0,
            reorder_point: 0,
            reorder_quantity: 0,
            safety_stock: 0,
            stock_on_order: 0,
          },
        },
        price,
        description: description || "",
        details: details || "",
        weight: weight || 0,
        height: height || 0,
        width: width || 0,
        depth: depth || 0,
        special_label_needed: specialLabelNeeded || false,
      },
    });
    return product;
  }

  // READ
  static async find({ id }) {
    return prisma.product.findUnique({ where: { id } });
  }

  static async findAll() {
    return prisma.product.findMany();
  }

  // UPDATE
  static async update({ id, input }) {
    const {
      name,
      price,
      description,
      details,
      weight,
      height,
      width,
      depth,
    } = input;
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        description,
        details,
        weight,
        height,
        width,
        depth,
      },
    });
    return product;
  }

  // DELETE
  static async delete({ id }) {
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
