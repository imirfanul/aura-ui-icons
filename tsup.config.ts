import { defineConfig } from "tsup"

export default defineConfig({
	entry: ["src/index.ts", "src/Icon.tsx", "src/generated/**/*.ts"],
	format: ["esm", "cjs"],
	dts: false, // ⬅️ disable tsup's dts builder
	splitting: false,
	treeshake: true,
	clean: true,
	sourcemap: true,
	outDir: "dist"
})
