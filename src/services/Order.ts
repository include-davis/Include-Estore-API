import prisma from "../prisma/client";

export default class Orders {
  // CREATE
  static async create({ userId, input }) {
    const { status, items } = input; // Assuming 'items' is an array of item IDs
    const order = await prisma.order.create({
      data: {
        userId,
        status,
        items: {
          connect: items.map(item => ({ id: item }))
        },
      },
    });
    return order;
  }

  // READ
  static async find({ id }) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: true, // Assuming you have a relation setup to include items details
      },
    });
  }

  static async findAll() {
    return prisma.order.findMany({
      include: {
        items: true, // Including items details
      },
    });
  }

  // UPDATE
  // Assuming you might want to update the status of an order
  static async updateStatus({ orderId, status }) {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    return updatedOrder;
  }

  // DELETE
  // Assuming you might want to support order cancellation/deletion
  static async delete({ id }) {
    const deleteOrder = await prisma.order.delete({
      where: { id },
    });
    return deleteOrder;
  }

  // ADDITIONAL FUNCTIONALITY
  // Example: Add item to order
  static async addItem({ orderId, itemId }) {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          items: {
            connect: { id: itemId },
          },
        },
      });
      return order;
    } catch (e) {
      console.error("Error adding item to order: ", e);
      return false;
    }
  }

  // Example: Remove item from order
  static async removeItem({ orderId, itemId }) {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          items: {
            disconnect: { id: itemId },
          },
        },
      });
      return order;
    } catch (e) {
      console.error("Error removing item from order: ", e);
      return false;
    }
  }
}
