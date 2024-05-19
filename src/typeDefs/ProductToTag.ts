import gql from "graphql-tag";

const typeDefs = gql`
  type ProductToTag {
    product_id: ID!
    product: Product!
    tag_name: String!
    tag: Tag!
  }

  input ProductToTagInput {
    product_id: ID!
    tag_name: String!
  }

  type Query {
    manyPTTs: [ProductToTag]
  }

  type Mutation {
    addProductToTag(input: ProductToTagInput!): ProductToTag
    removeProductToTag(input: ProductToTagInput!): Boolean
  }
`;
export default typeDefs;
