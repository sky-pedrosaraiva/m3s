import solid from "solid-start/vite";
import netlify from "solid-start-netlify";
import { VitePluginFonts } from "vite-plugin-fonts";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    solid({ ssr: false, adapter: netlify({ edge: true }) }),
    VitePluginFonts({
      google: {
        families: ["Source Sans Pro"],
      },
    }),
  ],
});
