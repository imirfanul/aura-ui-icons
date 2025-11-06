import * as React from "react"
import { ICON_REGISTRY } from "./internal/registry"

export type IconProps = React.SVGProps<SVGSVGElement> & {
	set: keyof typeof ICON_REGISTRY // 'lucide' | 'phosphor' | 'radix' | 'heroicons/outline' | 'heroicons/solid' | 'tabler'
	name: string // pretty name (e.g., 'Home')
	size?: number | string
	fallback?: React.ReactNode
}

export function Icon({
	set,
	name,
	size = 24,
	fallback = null,
	...rest
}: IconProps) {
	const [Comp, setComp] = React.useState<any>(null)

	React.useEffect(() => {
		let mounted = true
		const path = set.startsWith("heroicons/")
			? `./generated/heroicons/${set.split("/")[1]}/index.js`
			: `./generated/${set}/index.js`

		import(path)
			.then((mod) => {
				const C = (mod as any)[name]
				if (C && mounted) setComp(() => C)
			})
			.catch(() => mounted && setComp(null))

		return () => {
			mounted = false
		}
	}, [set, name])

	if (!Comp) return <>{fallback}</>
	return <Comp width={size} height={size} aria-hidden {...rest} />
}

export default Icon
