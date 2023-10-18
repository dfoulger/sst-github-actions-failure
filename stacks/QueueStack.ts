import {Queue, StackContext, use} from "sst/constructs";
import {SecretsStack} from "./SecretsStack";
import cdk from "aws-cdk-lib";

export function QueueStack({stack}: StackContext) {
    const {A_SECRET_KEY, A_SECRET_CONNECTION} = use(SecretsStack);

    const AQueue = new Queue(stack, "AQueue", {
        cdk: {
            queue: {
                receiveMessageWaitTime: cdk.Duration.seconds(
                    stack.stage === "prod" ? 5 : 20
                ),
            },
        },
        consumer: {
            cdk: {
                eventSource: {
                    enabled: stack.stage === "prod"
                }
            },
            function: {
                bind: [A_SECRET_KEY, A_SECRET_CONNECTION],
                handler: "packages/functions/src/lambda.handler",
            },
        },
    });

    const BQueue = new Queue(stack, "BQueue", {
        cdk: {
            queue: {
                receiveMessageWaitTime: cdk.Duration.seconds(
                    stack.stage === "prod" ? 5 : 20
                ),
            },
        },
        consumer: {
            cdk: {
                eventSource: {
                    enabled: stack.stage === "prod"
                }
            },
            function: {
                bind: [A_SECRET_KEY, A_SECRET_CONNECTION],
                handler: "packages/functions/src/lambda.handler",
            },
        },
    });

    return {
        A_QUEUE: AQueue,
        B_QUEUE: BQueue
    };
}
