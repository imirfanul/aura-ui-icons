# 🎨 Aura UI Icons

> **One import for many icon sets.** Use icons from **Lucide**, **Phosphor**, **Heroicons (outline/solid)**, **Radix**, and **Tabler** — all via `aura-ui-icons`.
> Clean names (`<Home />`, not `<HomeIcon />`), tree-shakable imports, and full TypeScript support.

---

## 📦 Install

```bash
# core package
pnpm add aura-ui-icons react react-dom
# or npm / yarn
# npm i aura-ui-icons react react-dom
# yarn add aura-ui-icons react react-dom
```

> This package re-exports official icon libraries. Install only the sets you plan to use (optional but recommended for smaller installs):

```bash
pnpm add lucide-react @phosphor-icons/react @heroicons/react @radix-ui/react-icons @tabler/icons-react
```

---

## ✨ Quick Start

### Named imports (recommended)

```tsx
import { Home, Bell } from "aura-ui-icons/heroicons/outline";
import { Home as HomeSolid } from "aura-ui-icons/heroicons/solid";
import { Camera, Settings } from "aura-ui-icons/lucide";

export default function Example() {
  return (
    <>
      <Home />
      <HomeSolid />
      <Camera width={20} height={20} />
      <Settings aria-label="settings" />
      <Bell className="text-blue-500" />
    </>
  );
}
```

### Deep per-icon imports (maximum tree-shaking)

```tsx
import Home from "aura-ui-icons/heroicons/outline/Home";
import Camera from "aura-ui-icons/lucide/Camera";

export function Header() {
  return (
    <>
      <Home />
      <Camera />
    </>
  );
}
```

### Dynamic icon (when the icon name comes from data)

```tsx
import { Icon } from "aura-ui-icons";

export function DynamicIcons() {
  return (
    <>
      <Icon set="lucide" name="Camera" size={24} />
      <Icon set="heroicons/outline" name="Home" />
      <Icon set="heroicons/solid" name="Bell" color="#f59e0b" />
    </>
  );
}
```

**Supported `set` values:**

* `"lucide"`
* `"phosphor"`
* `"radix"`
* `"heroicons/outline"`
* `"heroicons/solid"`
* `"tabler"`

---

## 🧠 Props & Behavior

All icons are standard React SVG components, so you can pass any `<svg>` prop:

```tsx
<Camera
  width={24}
  height={24}
  strokeWidth={1.5}   // for stroke-based sets (e.g., lucide)
  color="currentColor"
  className="text-gray-600"
/>
```

The `<Icon />` helper accepts:

* `set`: one of the supported sets above
* `name`: exact icon component name (suffix-free, e.g., `"Home"`, `"Camera"`)
* `size`: number or string → applied to `width` and `height`
* any other SVG props (e.g., `color`, `className`, `aria-label`)

---

## 🔍 Finding icon names

Icon names match each library’s official names, but cleaned to be **suffix-free**:

* `Heroicons` exports `HomeIcon` → use `"Home"`
* `Tabler` exports `IconHome` → use `"Home"`
* Many already match (e.g., Lucide `Camera` → `"Camera"`)

Tip: temporarily render a couple and rely on your IDE’s autocomplete from subpath imports:

```ts
import * as Lucide from "aura-ui-icons/lucide";
// Lucide.Camera, Lucide.Settings, ...
```

---

## 🧩 Common Examples

#### With Tailwind

```tsx
import { Home } from "aura-ui-icons/heroicons/outline";
export const LinkItem = () => <Home className="w-5 h-5 text-slate-600" />;
```

#### In a Button

```tsx
import { Settings } from "aura-ui-icons/lucide";
export const IconButton = () => (
  <button aria-label="settings">
    <Settings width={18} height={18} />
  </button>
);
```

#### In a Menu/List

```tsx
import { Bell, Home } from "aura-ui-icons/heroicons/solid";
export function Menu() {
  return (
    <ul>
      <li><Home /> Dashboard</li>
      <li><Bell /> Notifications</li>
    </ul>
  );
}
```

---

## ⚡ Performance Tips

* Prefer **named** or **deep per-icon imports** for best tree-shaking:

  ```ts
  import { Camera } from "aura-ui-icons/lucide";        // good
  import Camera from "aura-ui-icons/lucide/Camera";     // best
  ```
* Use `<Icon />` only when the icon is **dynamic at runtime**.
* Install only the icon sets you actually use (they’re optional peer deps).

---

## 🧰 TypeScript

You’ll get full types out of the box. If your editor complains about React types, ensure:

```bash
pnpm add -D @types/react @types/react-dom
```

---

## ❓FAQ

**Q: Do I need to install all icon libraries?**
A: No. Install only the sets you use. Others remain optional.

**Q: Why do some names differ from upstream docs?**
A: We normalize names to be suffix-free (`Home` instead of `HomeIcon`/`IconHome`). Use the subpath’s exports to see exact names via autocomplete.

**Q: SSR / Next.js?**
A: Prefer static imports (named or deep) for SSR. The `<Icon />` helper uses dynamic imports and is best for client-side use.

---

## 🪪 License

* **Aura UI Icons**: MIT
* Third-party icon libraries: their respective licenses (e.g., MIT for Lucide/Heroicons/Phosphor/Radix/Tabler)

---

Happy shipping! If you’d like a mini cheatsheet (one-page with the most common imports), say the word and I’ll generate it.
