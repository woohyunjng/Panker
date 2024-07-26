import { Resolver, Query } from "type-graphql";
import Test from "../types/Test";

@Resolver(Test)
class TestResolver {
    @Query(() => String)
    hello() {
        return "world";
    }
}

export default TestResolver;
