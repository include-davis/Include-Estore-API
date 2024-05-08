import ProductsToTags from "../services/ProductsToTags";
import Products from "../services/Products";
import Tags from "../services/Tags";

const resolvers = {
  ProductToTag: {
    product: (_, { id }) => Products.find({ id }),
    tag: (_, { id }) => Tags.find({ id }),
  },
  Mutation: {
    addProductToTag: (_, { input }) => ProductsToTags.create({ input }),
    removeProductToTag: (_, { id }) => ProductsToTags.delete({ id }),
  },
};

export default resolvers;
