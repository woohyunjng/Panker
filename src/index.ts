import "reflect-metadata";

import Express from "express";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import TestResolver from "./resolvers/TestResolver";

import LogMiddleware from "./middlewares/Log";

import logger from "./utils/logger";

import config from "../config.json";

process.on("exit", async () => {
    await logger.info("Server is shutting down");
});

(async () => {
    await logger.setLevel(config.logLevel);

    const schema = await buildSchema({
        resolvers: [TestResolver],
        globalMiddlewares: [LogMiddleware],
    });

    const apollo = new ApolloServer({
        schema,
        logger,
        formatError: (error) => {
            logger.error(
                `[${error.extensions?.code}] ${error.message}  (Path: ${error.path}, Original: ${error.originalError?.stack})`
            );
            return error;
        },
    });

    await apollo.start();

    const app: Express.Application = Express();
    apollo.applyMiddleware({ app });

    app.listen(config.port, async () => {
        await logger.info(
            `Server is running on http://localhost:${config.port}/graphql`
        );
    });
})();
