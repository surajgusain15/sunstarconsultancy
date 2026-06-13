import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://sunstarconsultancy.in",
  base: "/",
  output: "static",
  integrations: [tailwind(), react(), mdx(), sitemap()],
});
