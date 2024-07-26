import "reflect-metadata";

import Express from "express";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import TestResolver from "./resolvers/TestResolver";

(async () => {
    const schema = await buildSchema({
        resolvers: [TestResolver],
    });

    const apollo = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }
        `,
        resolvers: {
            Query: {
                hello: () => "world",
            },
        },
    });

    await apollo.start();

    const app: Express.Application = Express();
    apollo.applyMiddleware({ app });

    app.listen(3000, () => {
        console.log("Server started on http://localhost:3000");
    });
})();
