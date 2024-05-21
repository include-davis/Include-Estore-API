import Products from "../services/Products";

const resolvers = {
  Query: {
    products: (_: any, { id }: any) => Products.find({ id }),
    manyProducts: (_: any, { ids }: any) => Products.findAll({ ids }),
  },
  Mutation: {
    createProducts: (_: any, { input }: any) => Products.create({ input }),
    updateProducts: (_: any, { id, input }: any) => Products.update({ id, input }),
    deleteProducts: (_: any, { id }: any) => Products.delete({ id }),
  },
};

export default resolvers;
