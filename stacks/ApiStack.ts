import {Api, StackContext, use} from "sst/constructs";
import {SecretsStack} from "./SecretsStack";

export function ApiStack({stack}: StackContext) {
    const {A_SECRET_KEY, A_SECRET_CONNECTION} = use(SecretsStack);
    const api = new Api(stack, "Api", {
        routes: {
            "GET /": "packages/functions/src/lambda.handler",
        },
        defaults: {
            function: {
                bind: [A_SECRET_KEY, A_SECRET_CONNECTION],
            },
        },
    });
    const API_URL = api.customDomainUrl || api.url;
    return {API_URL};
}
