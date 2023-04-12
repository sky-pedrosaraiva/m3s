import weaviate, { WeaviateClient } from "weaviate-ts-client";

const client: WeaviateClient = weaviate.client({
  scheme: "https",
  host: "my-sandbox-cluster-te54qy9i.weaviate.network",
  headers: { "X-HuggingFace-Api-Key": "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" },
});

export const queryMovies = async (query: string, limit: number = 10) => {
  const result: any = await client.graphql
    .get()
    .withClassName("Movie")
    .withFields("name image")
    .withNearText({ concepts: [query] })
    .withLimit(limit)
    .do();

  return result.data.Get.Movie;
};
