import Products from "../services/Products";

type ProductArgs = {
  id: string;
};

type ManyProductArgs = {
  ids: string[];
};

type CreateProductArgs = {
  input: any;
};

type UpdateProductArgs = {
  id: string;
  input: any;
};

type DeleteProductArgs = {
  id: string;
};

const resolvers = {
  Query: {
    products: (_: any, { id }: ProductArgs) => Products.find({ id }),
    manyProducts: (_: any, { ids }: ManyProductArgs) => Products.findAll({ ids }),
  },
  Mutation: {
    createProducts: (_: any, { input }: CreateProductArgs) => Products.create({ input }),
    updateProducts: (_: any, { id, input }: UpdateProductArgs) => Products.update({ id, input }),
    deleteProducts: (_: any, { id }: DeleteProductArgs) => Products.delete({ id }),
  },
};

export default resolvers;
