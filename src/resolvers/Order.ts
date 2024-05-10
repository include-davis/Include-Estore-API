import { OrderStatus } from "@prisma/client";
import Orders from "../services/Order"; // Ensure correct path to Orders class
import { CreateOrderInput } from "../typeDefs/Order";

const resolvers = {
  Query: {
    // Directly returning the promise from the service method
    getOrder: (_: any, { id }: { id: number }) => Orders.find({ id }),
    listOrders: () => Orders.findAll(),
  },
  Mutation: {
    // Directly returning the promise from the service method
    createOrder: (_: any, { input }: { input: CreateOrderInput }) => Orders.create({ input }),
    updateOrderStatus: (_: any, { id, status }: { id: number; status: OrderStatus }) =>
      Orders.updateStatus({ id, status }),
    deleteOrder: (_: any, { id }: { id: number }) => Orders.delete({ id }),
  },
};

export default resolvers;
