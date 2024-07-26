import { Field, ObjectType } from "type-graphql";

@ObjectType()
class Test {
    @Field()
    hello: string = "world";
}

export default Test;
