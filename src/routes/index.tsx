import { For, createResource, createSignal, JSX, Show } from "solid-js";

export interface Movie {
  name: string;
  image: string;
}

const fetchSearch = async (searchText: string) => {
  const response = await fetch(
    `http://localhost:3000/api/search?text=${searchText}`
  );
  return await response.json();
};

export default function Home() {
  const [searchText, setSearchText] = createSignal("");
  const [searchTextToSubmit, setSearchTextToSubmit] = createSignal("");
  const [movies] = createResource(searchTextToSubmit, fetchSearch);

  const handleSearchInput: JSX.EventHandler<HTMLInputElement, InputEvent> = (
    e
  ) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    setSearchText(value);
  };

  const handleSubmit = () => {
    setSearchTextToSubmit(searchText);
  };

  return (
    <main class="bg-gray-800 h-screen">
      <div class="text-gray-400 font-bold text-9xl flex justify-center py-2">
        <h1>Movie semantic search</h1>
      </div>
      <div class="flex items-center flex-row justify-around py-2">
        <div class="container mx-auto relative text-gray-600 focus-within:text-gray-400">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                class="p-1 focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  class="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="q"
              class="font-mono py-2 text-xl text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900 w-full"
              placeholder="Search..."
              autocomplete="off"
              onInput={handleSearchInput}
            />
          </form>
        </div>
      </div>

      <Show when={!movies.error || !movies.loading}>
        <div class="flex justify-around py-4">
          <div class="container grid grid-cols-5 grid-rows-3 gap-10">
            <For each={movies()}>
              {(it) => (
                <div class="">
                  <img class="object-cover w-48 h-full" src={it.image} />
                  <span class="text-3xl text-gray-400">{it.name}</span>
                </div>
              )}
            </For>
          </div>
        </div>
      </Show>
    </main>
  );
}
