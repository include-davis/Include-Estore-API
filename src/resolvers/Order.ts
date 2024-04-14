import Order from "../services/Order.ts"

const resolvers = {
  Order: {
    playlists: () => null,
  },
  Query: {
    song: (_, { id }) => Order.find({ id }),
    songs: () => Order.findAll(),
  },
  Mutation: {
    createOrder: (_, { input }) => Order.create({ input }),
  },
};
export default resolvers;
