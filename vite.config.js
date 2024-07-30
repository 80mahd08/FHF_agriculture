import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginPurgeCss from "@mojojoejo/vite-plugin-purgecss";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), pluginPurgeCss()],
});
