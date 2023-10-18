import {Cron, StackContext, use} from "sst/constructs";
import {SecretsStack} from "./SecretsStack";
import {TopicStack} from "./TopicStack";
import {QueueStack} from "./QueueStack";

/**
 * Cron runs regularly and pulls calendars for active accounts
 * If a calendar update is detected, the updated calendar is stored in the DB and an SNS event is fired
 * SQS picks up the calendar change event and triggers a lambda function to sync access code updates
 * @param stack
 * @constructor
 */
export function CronStack({stack}: StackContext) {
    const {A_SECRET_KEY, A_SECRET_CONNECTION} = use(SecretsStack);
    const {A_TOPIC} = use(TopicStack);
    const {A_QUEUE} = use(QueueStack);

    const cron = new Cron(stack, "Cron", {
        schedule: "cron(0 * * * ? *)", // hourly
        enabled: stack.stage === "prod",
        job: {
            function: {
                bind: [
                    A_SECRET_KEY,
                    A_SECRET_CONNECTION,
                    A_TOPIC,
                    A_QUEUE,
                ],
                handler: "packages/functions/src/lambda.handler",
            },
        },
    });

    return {
        CRON: cron,
    };
}
