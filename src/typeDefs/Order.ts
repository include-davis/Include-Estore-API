import { gql } from "graphql-tag";

const typeDefs = gql`
  enum OrderStatus {
    PENDING
    COMPLETED
  }

  type Order {
    id: ID!
    customer_name: String!
    customer_email: String!
    customer_phone_num: String!
    billing_address_line_1: String!
    billing_address_line_2: String!
    billing_city: String!
    billing_zip: String!
    billing_country: String!
    shipping_address_line_1: String!
    shipping_address_line_2: String!
    shipping_city: String!
    shipping_zip: String!
    shipping_country: String!
    status: OrderStatus!
    created_at: String! # Consider using DateTime type if your GraphQL setup supports it
  }

  type Query {
    getOrder(id: ID!): Order
    listOrders: [Order]!
  }

  type Mutation {
    createOrder(input: CreateOrderInput!): Order
    updateOrderStatus(id: ID!, status: OrderStatus!): Order
  }

  input CreateOrderInput {
    # Define input fields here
  }
`;

export default typeDefs;
