import {Config, StackContext} from "sst/constructs";

export function SecretsStack({stack}: StackContext) {
    return {
        A_SECRET_KEY: new Config.Secret(stack, "A_SECRET_KEY"),
        A_SECRET_CONNECTION: new Config.Secret(stack, "A_SECRET_CONNECTION")
    };
}
