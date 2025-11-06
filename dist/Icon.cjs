'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var jsxRuntime = require('react/jsx-runtime');

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

// src/Icon.tsx
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
var Icon_default = Icon;

exports.Icon = Icon;
exports.default = Icon_default;
//# sourceMappingURL=Icon.cjs.map
//# sourceMappingURL=Icon.cjs.map