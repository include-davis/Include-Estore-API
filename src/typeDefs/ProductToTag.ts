import gql from "graphql-tag";

const typeDefs = gql`
  type ProductToTag {
    product_id: ID!
    product: Product!
    tag_id: ID!
    tag: Tag!
  }

  input ProductToTagInput {
    product_id: ID!
    tag_id: ID!
  }

  type Mutation {
    addProductToTag(input: ProductToTagInput!): ProductToTag
    removeProductToTag(product_id: ID!): Boolean
  }
`;
export default typeDefs;
