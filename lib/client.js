import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "lyekv5qr",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-07-04",
  token: "sk3KRMMZn7RswsGs0BAl5wyeCWyFRVuWBqu85zjS5azp9lZDEtloT6FM6vOGGuWQEnS4iqgx91lghRDk8K76C7ffyToMSS7YsGR4liEzfvLZs1yvlvLyR0VWxnb4ajjBrIXcrycSfr5cmXJzHwMLznscMLvsVMFxsho5HNLgPj8iynuQr7n5",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};
