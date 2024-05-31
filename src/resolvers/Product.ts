import Products from "../services/Products";

const resolvers = {
  Query: {
    product: (_, { id }) => Products.find({ id }),
    products: (_, { ids }) => Products.findAll({ ids }),
  },
  Mutation: {
    createProduct: (_, { input }) => Products.create({ input }),
    updateProduct: (_, { id, input }) => Products.update({ id, input }),
    deleteProduct: (_, { id }) => Products.delete({ id }),
  },
};

export default resolvers;
