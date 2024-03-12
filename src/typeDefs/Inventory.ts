import gql from "graphql-tag";

const typeDefs = gql`
  type Inventory {
    id: ID!
    product: Product!
    available_quantity: Int!
    cost_of_production: Int!
    lead_time: Int!
    reorder_point: Int!
    reorder_quantity: Int!
    safety_stock: Int!
    stock_on_order: Int!
  }

  input InventoryInput {
    id: ID!
    available_quantity: Int
    cost_of_production: Int
    lead_time: Int
    reorder_point: Int
    reorder_quantity: Int
    safety_stock: Int
    stock_on_order: Int
  }

  type Query {
    inventory(id: ID!): Inventory
  }

  type Mutation {
    createInventory(input: InventoryInput!): Inventory
    updateInventory(id:ID!, input: InventoryInput!): Inventory
    deleteInventory(id: ID!): Boolean
  }
`;
export default typeDefs;
