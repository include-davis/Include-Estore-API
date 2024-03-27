import Products from "../services/Products";
import Inventories from "../services/Inventories";

const resolvers = {
  Product: {
    inventory: ({ id }) => Inventories.find({ id }),
  },
  Query: {
    product: (_, { id }) => Products.find({ id }),
    products: () => Products.findAll(),
  },
  Mutation: {
    createProduct: (_, { input }) => Products.create({ input }),
    updateProduct: (_, { id, input }) => Products.update({ id, input }),
    deleteProduct: (_, { id }) => Products.delete({ id }),
  },
};

export default resolvers;
