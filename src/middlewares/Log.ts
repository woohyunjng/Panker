import { MiddlewareFn } from "type-graphql";

import logger from "../utils/logger";

const LogMiddleware: MiddlewareFn = async ({ info }, next) => {
    await logger.debug(`[${info.parentType.name}.${info.fieldName}]`);
    return next();
};
export default LogMiddleware;
