import * as React from 'react';
import { jsx, Fragment } from 'react/jsx-runtime';
import { createLucideIcon } from 'lucide-react';
import { createReactComponent } from '@tabler/icons-react';

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
function Icon({
  set,
  name,
  size = 24,
  fallback = null,
  ...rest
}) {
  const [Comp, setComp] = React.useState(null);
  React.useEffect(() => {
    let mounted = true;
    const path = set.startsWith("heroicons/") ? `./generated/heroicons/${set.split("/")[1]}/index.js` : `./generated/${set}/index.js`;
    import(path).then((mod) => {
      const C = mod[name];
      if (C && mounted) setComp(() => C);
    }).catch(() => mounted && setComp(null));
    return () => {
      mounted = false;
    };
  }, [set, name]);
  if (!Comp) return /* @__PURE__ */ jsx(Fragment, { children: fallback });
  return /* @__PURE__ */ jsx(Comp, { width: size, height: size, "aria-hidden": true, ...rest });
}

// src/generated/lucide/index.ts
var lucide_exports = {};
__export(lucide_exports, {
  CreateLucideIcon: () => createLucideIcon
});

// src/generated/phosphor/index.ts
var phosphor_exports = {};

// src/generated/radix/index.ts
var radix_exports = {};

// src/generated/tabler/index.ts
var tabler_exports = {};
__export(tabler_exports, {
  CreateReactComponent: () => createReactComponent
});

// src/generated/heroicons/index.ts
var heroicons_exports = {};

export { Icon, heroicons_exports as heroicons, lucide_exports as lucide, phosphor_exports as phosphor, radix_exports as radix, tabler_exports as tabler };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map