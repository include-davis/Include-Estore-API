import { OrderStatus } from "@prisma/client";
import prisma from "../prisma/client";

type CreateOrderInput = {
  status: OrderStatus;
  customerName: string;
  customerEmail: string;
  customerPhoneNum: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingCity: string;
  billingZip: string;
  billingCountry: string;
  shippingAddressLine1: string;
  shippingAddressLine2: string;
  shippingCity: string;
  shippingZip: string;
  shippingCountry: string;
};

export default class Orders {
  // CREATE
  static async create({ input } : {input: CreateOrderInput }) {
    const {
      status,
      customerName,
      customerEmail,
      customerPhoneNum,
      billingAddressLine1,
      billingAddressLine2,
      billingCity,
      billingZip,
      billingCountry,
      shippingAddressLine1,
      shippingAddressLine2,
      shippingCity,
      shippingZip,
      shippingCountry,
    } = input;
    const order = await prisma.order.create({
      data: {
        status,
        customerName,
        customerEmail,
        customerPhoneNum,
        billingAddressLine1,
        billingAddressLine2,
        billingCity,
        billingZip,
        billingCountry,
        shippingAddressLine1,
        shippingAddressLine2,
        shippingCity,
        shippingZip,
        shippingCountry,
      },
    });
    return order;
  }

  // READ
  static async find({ orderId } : {orderId : string}) {
    return prisma.order.findUnique({
      where: { orderId },
    });
  }

  static async findAll() {
    return prisma.order.findMany({
    });
  }

  // UPDATE
  // Assuming you might want to update the status of an order
  static async updateStatus({ orderId, status } : {orderId : string, status: OrderStatus}) {
    const updatedOrder = await prisma.order.update({
      where: { orderId },
      data: { status },
    });
    return updatedOrder;
  }

  // DELETE
  // Assuming you might want to support order cancellation/deletion
  static async delete({ orderId } : { orderId: string }) {
    const deleteOrder = await prisma.order.delete({
      where: { orderId },
    });
    return deleteOrder;
  }
}
