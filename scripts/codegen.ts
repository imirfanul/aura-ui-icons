import { mkdirSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { PACKS } from "./packs.config"

const ensureDir = (p: string) => mkdirSync(p, { recursive: true })

// Normalize names like HomeIcon -> Home, IconHome -> Home
function transformName(set: string, raw: string): string {
	let name = raw
	if (set.startsWith("heroicons") || set === "radix")
		name = name.replace(/Icon$/u, "")
	if (set === "tabler") name = name.replace(/^Icon/u, "")
	name = name.replace(/^Icon/u, "").replace(/Icons$/u, "")
	if (!/^[A-Z]/.test(name))
		name = name.charAt(0).toUpperCase() + name.slice(1)
	return name
}

const TS_HEADER = `// AUTO-GENERATED. DO NOT EDIT.
import type { ComponentType, SVGProps } from 'react';
export type IconType = ComponentType<SVGProps<SVGSVGElement>>;
`

const DTS_HEADER = `// AUTO-GENERATED. DO NOT EDIT.
import type { IconType } from '../../types';
`

const registry: Record<string, string[]> = {}

// ensure internal dir exists (for registry)
mkdirSync("src/internal", { recursive: true })

for (const pack of PACKS) {
	const mod = await import(pack.entry).catch(() => ({}))
	const rawExports = Object.keys(mod).filter(
		(k) => typeof (mod as any)[k] === "function"
	)

	const outDir = pack.set.startsWith("heroicons-")
		? `src/generated/heroicons/${pack.set.split("-")[1]}`
		: `src/generated/${pack.set}`

	ensureDir(outDir)

	// Map raw -> pretty names
	const mapped: Array<{ raw: string; pretty: string }> = []
	const seen = new Set<string>()
	for (const raw of rawExports) {
		const pretty = transformName(pack.set, raw)
		const finalPretty = seen.has(pretty) ? `${pretty}_${raw}` : pretty // collision guard
		seen.add(finalPretty)
		mapped.push({ raw, pretty: finalPretty })
	}

	// 1) namespaced index.ts (named exports)
	{
		const indexPath = resolve(outDir, "index.ts")
		const idx = [TS_HEADER, `// ${pack.entry}`]
		for (const { raw, pretty } of mapped) {
			idx.push(`export { ${raw} as ${pretty} } from '${pack.entry}';`)
		}
		writeFileSync(indexPath, idx.join("\n"))
	}

	// 1b) namespaced index.d.ts (named declarations)
	{
		const indexDtsPath = resolve(outDir, "index.d.ts")
		const dts: string[] = [
			`// AUTO-GENERATED. DO NOT EDIT.`,
			`import type { IconType } from '../../types';`
		]
		for (const { pretty } of mapped) {
			dts.push(`export declare const ${pretty}: IconType;`)
		}
		writeFileSync(indexDtsPath, dts.join("\n"))
	}

	// 2) per-icon deep files (default export)
	for (const { raw, pretty } of mapped) {
		const fileTs = resolve(outDir, `${pretty}.ts`)
		writeFileSync(
			fileTs,
			`export { ${raw} as default } from '${pack.entry}';\n`
		)

		const fileDts = resolve(outDir, `${pretty}.d.ts`)
		writeFileSync(
			fileDts,
			`// AUTO-GENERATED. DO NOT EDIT.
import type { IconType } from '../../types';
declare const _default: IconType;
export default _default;
`
		)
	}

	const setKey = pack.set.replace("heroicons-", "heroicons/")
	registry[setKey] = mapped.map((m) => m.pretty)
}

// 3) unified registry for <Icon />
writeFileSync(
	"src/internal/registry.ts",
	`// AUTO-GENERATED. DO NOT EDIT.
export const ICON_REGISTRY = ${JSON.stringify(registry, null, 2)} as const;
`
)

// 4) heroicons root facade
mkdirSync("src/generated/heroicons", { recursive: true })
writeFileSync(
	"src/generated/heroicons/index.ts",
	`// AUTO-GENERATED. DO NOT EDIT.
export * from './outline/index';
export * from './solid/index';
`
)
writeFileSync(
	"src/generated/heroicons/index.d.ts",
	`// AUTO-GENERATED. DO NOT EDIT.
export * from './outline/index';
export * from './solid/index';
`
)

console.log("Codegen complete (with .d.ts).")
