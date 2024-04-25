import { gql } from "graphql-tag";

const typeDefs = gql`
  enum OrderStatus {
    PENDING
    COMPLETED
  }

  type Order {
    orderId: ID!
    customerName: String!
    customerEmail: String!
    customerPhoneNum: String!
    billingAddressLine1: String!
    billingAddressLine2: String!
    billingCity: String!
    billingZip: String!
    billingCountry: String!
    shippingAddressLine1: String!
    shippingAddressLine2: String!
    shippingCity: String!
    shippingZip: String!
    shippingCountry: String!
    status: OrderStatus!
    createdAt: String! # Consider using DateTime if supported
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
    orderId: ID!
    customerName: String!
    customerEmail: String!
    customerPhoneNum: String!
    billingAddressLine1: String!
    billingAddressLine2: String!
    billingCity: String!
    billingZip: String!
    billingCountry: String!
    shippingAddressLine1: String!
    shippingAddressLine2: String!
    shippingCity: String!
    shippingZip: String!
    shippingCountry: String!
    status: OrderStatus!
    createdAt: String! # Consider using DateTime if supported
  }
`;

export default typeDefs;

export type orderId = String;
