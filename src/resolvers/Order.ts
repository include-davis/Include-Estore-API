import Order from "../services/Order";
import { orderId, CreateOrderInput } from "../typeDefs/Order";

const resolvers = {
  Order: {
    playlists: () => null,
  },
  Query: {
    order: (_: any, { id }: { id: orderId}) => Order.find({ id }),
    orders: () => Order.findAll(),
  },
  Mutation: {
    createOrder: (_:any, { input } : {input: CreateOrderInput}) => Order.create({ userId, input }),
  },
};
export default resolvers;
