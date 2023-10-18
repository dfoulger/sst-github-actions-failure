import {SSTConfig} from "sst";
import {SecretsStack} from "./stacks/SecretsStack";
import {QueueStack} from "./stacks/QueueStack";
import {TopicStack} from "./stacks/TopicStack";
import {CronStack} from "./stacks/CronStack";
import {ApiStack} from "./stacks/ApiStack";
import {SiteStack} from "./stacks/SiteStack";

export default {
    config(_input) {
        return {
            name: "sst-github-actions-failure",
            region: "us-east-1",
        };
    },
    stacks(app) {
        app
            .stack(SecretsStack)
            .stack(QueueStack)
            .stack(TopicStack)
            .stack(CronStack)
            .stack(ApiStack)
            .stack(SiteStack)
    }
} satisfies SSTConfig;
