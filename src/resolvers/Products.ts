import Products from "../services/Products";

const resolvers = {
  Product: {
    tags: (_, { id }) => Products.findTags({ id }),
  },
  Query: {
    products: (_, { id }) => Products.find({ id }),
    manyProducts: (_, { ids }) => Products.findAll({ ids }),
  },
  Mutation: {
    createProducts: (_, { input }) => Products.create({ input }),
    updateProducts: (_, { id, input }) => Products.update({ id, input }),
    deleteProducts: (_, { id }) => Products.delete({ id }),
  },
};

export default resolvers;
