import Product from "../services/Product";

const resolvers = {
  Query: {
    product: (_, { id }) => Product.find({ id }),
    products: (_, { ids }) => Product.findAll({ ids }),
  },
  Mutation: {
    createProduct: (_, { input }) => Product.create({ input }),
    updateProduct: (_, { id, input }) => Product.update({ id, input }),
    deleteProduct: (_, { id }) => Product.delete({ id }),
  },
};

export default resolvers;
