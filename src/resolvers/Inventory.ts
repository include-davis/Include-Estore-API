import Inventories from "../services/Inventories";
import Products from "../services/Products";

const resolvers = {
  Inventory: {
    product: ({ id }) => Products.find({ id }),
  },
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
