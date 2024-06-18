import gql from "graphql-tag";

const typeDefs = gql`
    type Product {
        id: ID!
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
        description: String!
        details: String!
        weight: Int!
        height: Int!
        width: Int!
        depth: Int!
        special_label_needed: Boolean!
    }

    input ProductUpdateInput {
        name: String
        price: Int
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
        products(id: [ID]): [Product]
    }

    type Mutation {
        createProduct(input: ProductInput!): Product
        updateProduct(id: ID!, input: ProductUpdateInput!): Product
        deleteProduct(id: ID!): Boolean
    }
`;
export default typeDefs;
