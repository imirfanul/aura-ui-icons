'use strict';

var React = require('react');
var jsxRuntime = require('react/jsx-runtime');
var lucideReact = require('lucide-react');
var iconsReact = require('@tabler/icons-react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

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
  const [Comp, setComp] = React__namespace.useState(null);
  React__namespace.useEffect(() => {
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
  if (!Comp) return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: fallback });
  return /* @__PURE__ */ jsxRuntime.jsx(Comp, { width: size, height: size, "aria-hidden": true, ...rest });
}

// src/generated/lucide/index.ts
var lucide_exports = {};
__export(lucide_exports, {
  CreateLucideIcon: () => lucideReact.createLucideIcon
});

// src/generated/phosphor/index.ts
var phosphor_exports = {};

// src/generated/radix/index.ts
var radix_exports = {};

// src/generated/tabler/index.ts
var tabler_exports = {};
__export(tabler_exports, {
  CreateReactComponent: () => iconsReact.createReactComponent
});

// src/generated/heroicons/index.ts
var heroicons_exports = {};

exports.Icon = Icon;
exports.heroicons = heroicons_exports;
exports.lucide = lucide_exports;
exports.phosphor = phosphor_exports;
exports.radix = radix_exports;
exports.tabler = tabler_exports;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map