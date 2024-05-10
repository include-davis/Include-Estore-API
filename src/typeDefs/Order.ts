import { gql } from "graphql-tag";
import { OrderStatus } from "@prisma/client";

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
    billingAddressLine2: String
    billingCity: String!
    billingZip: String!
    billingCountry: String!
    shippingAddressLine1: String!
    shippingAddressLine2: String
    shippingCity: String!
    shippingZip: String!
    shippingCountry: String!
    status: OrderStatus!
    createdAt: String!  # Consider using DateTime if supported
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
    billingAddressLine2: String
    billingCity: String!
    billingZip: String!
    billingCountry: String!
    shippingAddressLine1: String!
    shippingAddressLine2: String!
    shippingCity: String!
    shippingZip: String!
    shippingCountry: String!
    status: OrderStatus!
    createdAt: String!  # Consider using DateTime if supported
  }
`;

export default typeDefs;

export type CreateOrderInput = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhoneNum: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingCity: string;
  billingZip: string;
  billingCountry: string;
  shippingAddressLine1: string;
  shippingAddressLine2: string;
  shippingCity: string;
  shippingZip: string;
  shippingCountry: string;
  status: OrderStatus;
  createdAt: string;
};
