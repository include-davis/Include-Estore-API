import Products from "../services/Products";
import { ProductInput } from "../types/Product";

const resolvers = {
  Query: {
    product: (_: any, args: { id: string }) => Products.find(args.id),
    products: (_: any, args: { ids: [string] }) => Products.findAll(args.ids),
  },
  Mutation: {
    createProduct: (_: any, args: { input: ProductInput }) => Products.create(args.input),
    updateProduct: (_: any, args: { id: string; input: ProductInput }) =>
      Products.update(args.id, args.input),
    deleteProduct: (_: any, args: { id: string }) => Products.delete(args.id),
  },
};

export default resolvers;
