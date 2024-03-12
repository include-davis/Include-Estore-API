import Inventories from "../services/Inventories";

const resolvers = {
  Inventory: {},
  Query: {
    inventory: (_, { id }) => Inventories.find({ id }),
  },
  Mutation: {
    createInventory: (_, { input }) => Inventories.create({ input }),
    updateInventory: (_, { id, input }) => Inventories.update({ id, input }),
    deleteInventory: (_, { id }) => Inventories.delete({ id }),
  },
};

export default resolvers;
