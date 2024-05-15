// Imports
import { ApolloServer } from "@apollo/server";
// import { ApolloServerErrorCode } from "@apollo/server/errors";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import prisma from "./prisma/client";

// Type definitions
import typeDefs from "./typeDefs/index";
import resolvers from "./resolvers/index";
import { authenticate } from "./util/authToken";

// Define Prisma Client type
type Context = {
  prisma: PrismaClient;
  user: any;
  res: express.Response;
};

// Main server function
async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Create Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({
      httpServer,
    }),
    ],
    // format custom error here
    // eslint-disable-next-line no-unused-vars
    formatError: (formattedError, error) => {
      // Return a different error message for failing login and registers
      if (
        formattedError.extensions.code
        === "NOT_FOUND"
      ) {
        return {
          ...formattedError,
          message: "User not found!",
        };
      }
      if (
        formattedError.extensions.code
        === "USER_EXISTS"
      ) {
        return {
          ...formattedError,
          message: "User already exists!",
        };
      }
      if (
        formattedError.extensions.code
        === "WRONG_PASSWORD"
      ) {
        return {
          ...formattedError,
          message: "Wrong password!",
        };
      }
      // Otherwise return the formatted error. This error can also
      // be manipulated in other ways, as long as it's returned.
      return formattedError;
    },
  });

  // Server startup and middleware setup
  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    cookieParser(),
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<Context> => ({
        prisma,
        user: authenticate({ req }).auth.body,
        res,
      }),
    }),
  );

  // Start HTTP server
  await httpServer.listen({ port: process.env.PORT || 4000 });
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}/graphql 🚀`);
}

// Start the server
startServer();
