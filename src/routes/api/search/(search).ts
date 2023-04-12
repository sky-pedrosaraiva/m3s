import { APIEvent, json } from "solid-start/api";

import { queryMovies } from "../../../lib/api";

export const GET = async (event: APIEvent) => {
  const url = event.request.url;
  const query = url.substring(url.indexOf("?"));
  const sp = new URLSearchParams(query);
  const searchText = sp.get("text");

  if (!searchText) {
    return json([]);
  }

  return json(await queryMovies(searchText));
};
