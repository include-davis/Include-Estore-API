import gql from "graphql-tag";

const typeDefs = gql`
    type Products {
        id: ID!
        name: String!
        price: Int!
        description: String!
        details: String!
        weight: Int!
        height: Int!
        width: Int!
        depth: Int!
        special_label_needed: Boolean!
    }

    input ProductsInput {
        name: String!
        price: Int!
        description: String!
        details: String!
        weight: Int!
        height: Int!
        width: Int!
        depth: Int!
        special_label_needed: Boolean!
    }

    input ProductsInputOptional {
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
        products(id: ID!): Products
        manyProducts(id: [ID]): [Products]
    }

    type Mutation {
        createProducts(input: ProductsInput!): Products
        updateProducts(id: ID!, input: ProductsInputOptional!): Products
        deleteProducts(id: ID!): Boolean
    }
`;
export default typeDefs;
