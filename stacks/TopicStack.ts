import {StackContext, Topic, use} from "sst/constructs";
import {QueueStack} from "./QueueStack";

export function TopicStack({stack}: StackContext) {
    const {A_QUEUE} = use(QueueStack);

    const topic = new Topic(stack, "ATopic", {
        subscribers: {
            subscriber: A_QUEUE,
        },
    });

    return {
        A_TOPIC: topic
    };
}
