import prisma from "../prisma/client";

export default class Inventories {
  // CREATE
  static async create({ input }) {
    const {
      id,
      availableQuantity,
      costOfProduction,
      leadTime,
      reorderPoint,
      reorderQuantity,
      safetyStock,
      stockOnOrder,
    } = input;
    const inventory = await prisma.inventory.create({
      data: {
        product: {
          connect: { id },
        },
        available_quantity: availableQuantity || 0,
        cost_of_production: costOfProduction || 0.00,
        lead_time: leadTime || 0,
        reorder_point: reorderPoint || 0,
        reorder_quantity: reorderQuantity || 0,
        safety_stock: safetyStock || 0,
        stock_on_order: stockOnOrder || 0,
      },
    });
    return inventory;
  }

  // READ
  static async find({ id }) {
    return prisma.inventory.findUnique({ where: { id } });
  }

  // static async findAll() {
  //   return prisma.inventory.findMany();
  // }

  // UPDATE
  static async update({ id, input }) {
    try {
      const inventory = await prisma.inventory.update({
        where: {
          id,
        },
        data: input,
      });
      return inventory;
    } catch (e) {
      return null;
    }
  }

  // DELETE
  static async delete({ id }) {
    try {
      await prisma.inventory.delete({
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
