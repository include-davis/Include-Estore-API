import { OrderStatus } from "@prisma/client";
import Orders from "../services/Order"; // Ensure correct path to Orders class
import { CreateOrderInput } from "../typeDefs/Order";

const resolvers = {
  Query: {
    // Directly returning the promise from the service method
    getOrder: (_: any, { orderId }: { orderId: string }) => Orders.find({ orderId }),
    listOrders: () => Orders.findAll(),
  },
  Mutation: {
    // Directly returning the promise from the service method
    createOrder: (_: any, { input }: { input: CreateOrderInput }) => Orders.create({ input }),
    updateOrderStatus: (_: any, { orderId, status }: { orderId: string; status: OrderStatus }) =>
      Orders.updateStatus({ orderId, status }),
    deleteOrder: (_: any, { orderId }: { orderId: string }) => Orders.delete({ orderId }),
  },
};

export default resolvers;
