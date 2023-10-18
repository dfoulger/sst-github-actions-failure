import {StackContext, Topic, use} from "sst/constructs";
import {QueueStack} from "./QueueStack";

export function TopicStack({stack}: StackContext) {
    const {A_QUEUE, B_QUEUE} = use(QueueStack);

    const topic = new Topic(stack, "ATopic", {
        subscribers: {
            subscriber: A_QUEUE,
        },
    });

    const bTopic = new Topic(stack, "BTopic", {
        subscribers: {
            subscriber: B_QUEUE,
        },
    });

    return {
        A_TOPIC: topic,
        B_TOPIC: bTopic
    };
}
