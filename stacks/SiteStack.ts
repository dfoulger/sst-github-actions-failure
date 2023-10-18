import {use, StackContext, SvelteKitSite} from "sst/constructs";
import {SecretsStack} from "./SecretsStack";
import {TopicStack} from "./TopicStack";

export function SiteStack({stack}: StackContext) {
    const secrets = use(SecretsStack);
    const {A_TOPIC} = use(TopicStack);
    const site = new SvelteKitSite(stack, "site", {
        path: "packages/site",
        bind: [
            secrets.A_SECRET_KEY,
            secrets.A_SECRET_CONNECTION,
            A_TOPIC,
        ],
        customDomain: {
            domainName: `${stack.stage}.test.sixstartech.com`,
            hostedZone: "sixstartech.com",
        },
    });
    stack.addOutputs({
        SiteUrl: site.customDomainUrl || site.url,
    });
}
