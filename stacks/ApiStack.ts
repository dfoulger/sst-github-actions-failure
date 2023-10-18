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
        customDomain: {
            domainName: `${stack.stage}-api.test.sixstartech.com`,
            hostedZone: "sixstartech.com",
        },
    });
    const API_URL = api.customDomainUrl || api.url;
    stack.addOutputs({
        ApiUrl: API_URL,
    });
    return {API_URL};
}
