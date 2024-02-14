import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
// eslint-disable-next-line max-len
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import prisma from "./prisma/client.js";

import typeDefs from "./typeDefs/index.js";
import resolvers from "./resolvers/index.js";

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const context = {
    prisma,
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context,
  });

  await server.start();

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log("🚀 Server ready at http://localhost:4000/graphql");
}

startServer();
