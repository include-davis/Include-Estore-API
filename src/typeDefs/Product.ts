import gql from "graphql-tag";

const typeDefs = gql`
  type Product {
    id: ID!
    inventory: Inventory!
    name: String!
    price: Float!
    description: String!
    details: String!
    weight: Int!
    height: Int!
    width: Int!
    depth: Int!
    special_label_needed: Boolean!
  }

  input ProductInput {
    name: String!
    price: Float!
    description: String
    details: String
    weight: Int
    height: Int
    width: Int
    depth: Int
    special_label_needed: Boolean
  }

  input UpdateProductInput {
    name: String
    price: Float
    description: String
    details: String
    weight: Int
    height: Int
    width: Int
    depth: Int
    special_label_needed: Boolean
  }

  type Query {
    product(id: ID!): Product
    products: [Product]
  }

  type Mutation {
    createProduct(input: ProductInput!): Product
    updateProduct(id: ID!, input: UpdateProductInput!): Product
    deleteProduct(id: ID!): Boolean
  }
`;
export default typeDefs;
