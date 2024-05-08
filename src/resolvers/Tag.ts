import Tags from "../services/Tags";

const resolvers = {
  Tag: {
    products: (_, { id }) => Tags.findProducts({ id }),
  },
  Query: {
    tag: (_, { id }) => Tags.find({ id }),
    manyTags: (_, { ids }) => Tags.findAll({ ids }),
  },
  Mutation: {
    createTag: (_, { input }) => Tags.create({ input }),
    deleteTag: (_, { id }) => Tags.delete({ id }),
  },
};

export default resolvers;
