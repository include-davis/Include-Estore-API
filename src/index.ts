// Imports
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import prisma from "./prisma/client";

// Type definitions
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

// Define Prisma Client type
type Context = {
  prisma: PrismaClient;
  token?: string;
};

// Main server function
async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Server startup and middleware setup
  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<Context> => ({
        prisma,
        token: req.headers.token as string, // Assuming 'token' is present in headers
      }),
    }),
  );

  // Start HTTP server
  const port = process.env.PORT || 4000;
  httpServer.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql 🚀`);
  });
}

// Start the server
startServer().catch((error) => {
  console.error("Server failed to start", error);
});
