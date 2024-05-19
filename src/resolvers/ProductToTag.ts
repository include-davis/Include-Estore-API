import ProductsToTags from "../services/ProductsToTags";
import Products from "../services/Products";
import Tags from "../services/Tags";

const resolvers = {
  ProductToTag: {
    product: (_, { id }) => Products.find({ id }),
    tag: (_, { name }) => Tags.findName({ name }),
  },
  Query: {
    manyPTTs: (_) => ProductsToTags.findAll(),
  },
  Mutation: {
    addProductToTag: (_, { input }) => ProductsToTags.create({ input }),
    removeProductToTag: (_, { input }) => ProductsToTags.delete({ input }),
  },
};

export default resolvers;
