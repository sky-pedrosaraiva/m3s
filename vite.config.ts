import solid from "solid-start/vite";
import { VitePluginFonts } from "vite-plugin-fonts";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    solid({ ssr: false }),
    VitePluginFonts({
      google: {
        families: ["Source Sans Pro"],
      },
    }),
  ],
});
