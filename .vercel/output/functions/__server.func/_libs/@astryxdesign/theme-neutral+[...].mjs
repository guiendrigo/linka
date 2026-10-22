import { o as __toESM } from "../../_runtime.mjs";
import { C as require_react, S as require_jsx_runtime } from "./core+[...].mjs";
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function toLucideIconData(iconName, iconNode, aliases = []) {
	if (iconNode == null) throw new Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: toKebabCase(iconName),
		size: 24,
		node: iconNode,
		...aliases.length > 0 ? { aliases } : {}
	};
}
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => {
	let out = "";
	let upperNext = false;
	for (const ch of string) {
		if (ch === "-" || ch === "_" || ch <= " ") {
			upperNext = out.length > 0;
			continue;
		}
		if (out.length === 0) out += ch.toLowerCase();
		else out += upperNext ? ch.toUpperCase() : ch;
		upperNext = false;
	}
	return out;
};
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function isDefined(value) {
	return value !== null && value !== void 0;
}
function buildLucideIconNode(icon, params = {}) {
	const attributeNames = params.attributeNames ?? {};
	const getAttributeName = (attributeName) => attributeNames[attributeName] ?? attributeName;
	const viewBoxWidth = icon.size ?? icon.width ?? defaultAttributes["width"];
	const viewBoxHeight = icon.size ?? icon.height ?? defaultAttributes["height"];
	const aliasClassNames = icon.aliases?.filter((alias) => typeof alias === "string" && alias.trim() !== "").map((alias) => `lucide-${alias}`) ?? [];
	const iconClassNames = [...icon.name ? [`lucide-${icon.name}`] : [], ...aliasClassNames];
	const classNamesFromClassName = params.className?.split(" ").filter(Boolean) ?? [];
	const className = params.includeDefaultClasses === false ? mergeClasses(...classNamesFromClassName) : mergeClasses("lucide", ...iconClassNames, ...classNamesFromClassName);
	const calculatedStrokeWidth = params.absoluteStrokeWidth ? Number(params.strokeWidth ?? defaultAttributes["stroke-width"]) * Number(icon.size ?? icon.width ?? defaultAttributes["width"]) / Number(params.size ?? params.width ?? defaultAttributes["width"]) : params.strokeWidth ?? defaultAttributes["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(defaultAttributes).reduce((attrs, [attrName, value]) => {
				attrs[getAttributeName(attrName)] = value;
				return attrs;
			}, {}),
			..."color" in params && params.color && { [getAttributeName("stroke")]: params.color },
			..."size" in params && isDefined(params.size) && {
				[getAttributeName("width")]: params.size,
				[getAttributeName("height")]: params.size
			},
			..."width" in params && isDefined(params.width) && { [getAttributeName("width")]: params.width },
			..."height" in params && isDefined(params.height) && { [getAttributeName("height")]: params.height },
			[getAttributeName("stroke-width")]: calculatedStrokeWidth,
			...className && { [getAttributeName("class")]: className },
			[getAttributeName("viewBox")]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
			...params.hasA11yProp === false ? { [getAttributeName("aria-hidden")]: "true" } : {},
			..."attributes" in params && params.attributes
		},
		icon.node.map((child) => {
			const [name, attrs, children] = child;
			const nextAttrs = params.nonScalingStroke ? {
				[getAttributeName("vector-effect")]: "non-scaling-stroke",
				...attrs
			} : attrs;
			return children ? [
				name,
				nextAttrs,
				children
			] : [name, nextAttrs];
		})
	];
}
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function buildLucideIconForReact(icon, params = {}) {
	return buildLucideIconNode(icon, {
		...params,
		attributeNames: {
			...params.attributeNames,
			class: "className",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-linejoin": "strokeLinejoin",
			"vector-effect": "vectorEffect"
		}
	});
}
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/context.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LucideContext = (0, import_react.createContext)({});
var useLucideContext = () => (0, import_react.useContext)(LucideContext);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/Icon.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color, size, width, height, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className = "", children, iconNode = [], icon = {
	node: iconNode,
	aliases: [],
	size: 24
}, ...rest }, ref) => {
	const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, nonScalingStroke: contextNonScalingStroke = false, color: contextColor = "currentColor", className: contextClass = "" } = useLucideContext() ?? {};
	const hasAccessibleProp = Boolean(children) || hasA11yProp(rest);
	const [name, svgAttributes, builtIconNode = []] = buildLucideIconForReact(icon, {
		color: color ?? contextColor,
		width: width ?? size ?? contextSize,
		height: height ?? size ?? contextSize,
		strokeWidth: strokeWidth ?? contextStrokeWidth,
		absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
		nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
		className: mergeClasses(contextClass, className),
		hasA11yProp: hasAccessibleProp,
		attributes: rest
	});
	return (0, import_react.createElement)(name, {
		ref,
		...svgAttributes
	}, [...builtIconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]);
});
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function createLucideIcon(iconDataOrName, iconNode = [], aliases = []) {
	const iconData = typeof iconDataOrName === "string" ? toLucideIconData(iconDataOrName, iconNode, aliases) : iconDataOrName;
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		icon: iconData,
		className,
		...props
	}));
	if (iconData.name) Component.displayName = toPascalCase(iconData.name);
	return Component;
}
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/arrow-down.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$28 = {
	name: "arrow-down",
	size: 24,
	node: [["path", {
		d: "M12 5v14",
		key: "s699le"
	}], ["path", {
		d: "m19 12-7 7-7-7",
		key: "1idqje"
	}]]
};
__iconData$28.node;
var ArrowDown = createLucideIcon(__iconData$28);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/arrow-up-down.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$27 = {
	name: "arrow-up-down",
	size: 24,
	node: [
		["path", {
			d: "m21 16-4 4-4-4",
			key: "f6ql7i"
		}],
		["path", {
			d: "M17 20V4",
			key: "1ejh1v"
		}],
		["path", {
			d: "m3 8 4-4 4 4",
			key: "11wl7u"
		}],
		["path", {
			d: "M7 4v16",
			key: "1glfcx"
		}]
	]
};
__iconData$27.node;
var ArrowUpDown = createLucideIcon(__iconData$27);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/arrow-up.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$26 = {
	name: "arrow-up",
	size: 24,
	node: [["path", {
		d: "m5 12 7-7 7 7",
		key: "hav0vg"
	}], ["path", {
		d: "M12 19V5",
		key: "x0mq9r"
	}]]
};
__iconData$26.node;
var ArrowUp = createLucideIcon(__iconData$26);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/calendar.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$25 = {
	name: "calendar",
	size: 24,
	node: [
		["path", {
			d: "M8 2v3",
			key: "1ioesn"
		}],
		["path", {
			d: "M16 2v3",
			key: "otl347"
		}],
		["rect", {
			x: "3",
			y: "3",
			width: "18",
			height: "18",
			rx: "2",
			key: "h1oib"
		}],
		["path", {
			d: "M3 9h18",
			key: "1pudct"
		}]
	]
};
__iconData$25.node;
var Calendar = createLucideIcon(__iconData$25);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/check.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$24 = {
	name: "check",
	size: 24,
	node: [["path", {
		d: "M20 6 9 17l-5-5",
		key: "1gmf2c"
	}]]
};
__iconData$24.node;
var Check = createLucideIcon(__iconData$24);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/check-check.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$23 = {
	name: "check-check",
	size: 24,
	node: [["path", {
		d: "M18 6 7 17l-5-5",
		key: "116fxf"
	}], ["path", {
		d: "m22 10-7.5 7.5L13 16",
		key: "ke71qq"
	}]]
};
__iconData$23.node;
var CheckCheck = createLucideIcon(__iconData$23);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$22 = {
	name: "chevron-down",
	size: 24,
	node: [["path", {
		d: "m6 9 6 6 6-6",
		key: "qrunsl"
	}]]
};
__iconData$22.node;
var ChevronDown = createLucideIcon(__iconData$22);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/chevron-left.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$21 = {
	name: "chevron-left",
	size: 24,
	node: [["path", {
		d: "m15 18-6-6 6-6",
		key: "1wnfg3"
	}]]
};
__iconData$21.node;
var ChevronLeft = createLucideIcon(__iconData$21);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$20 = {
	name: "chevron-right",
	size: 24,
	node: [["path", {
		d: "m9 18 6-6-6-6",
		key: "mthhwq"
	}]]
};
__iconData$20.node;
var ChevronRight = createLucideIcon(__iconData$20);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/chevrons-left.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$19 = {
	name: "chevrons-left",
	size: 24,
	node: [["path", {
		d: "m11 17-5-5 5-5",
		key: "13zhaf"
	}], ["path", {
		d: "m18 17-5-5 5-5",
		key: "h8a8et"
	}]]
};
__iconData$19.node;
var ChevronsLeft = createLucideIcon(__iconData$19);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/chevrons-right.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$18 = {
	name: "chevrons-right",
	size: 24,
	node: [["path", {
		d: "m6 17 5-5-5-5",
		key: "xnjwq"
	}], ["path", {
		d: "m13 17 5-5-5-5",
		key: "17xmmf"
	}]]
};
__iconData$18.node;
var ChevronsRight = createLucideIcon(__iconData$18);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/circle-check-big.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$17 = {
	name: "circle-check-big",
	size: 24,
	node: [["path", {
		d: "M21.801 10A10 10 0 1 1 17 3.335",
		key: "yps3ct"
	}], ["path", {
		d: "m9 11 3 3L22 4",
		key: "1pflzl"
	}]],
	aliases: ["check-circle"]
};
__iconData$17.node;
var CircleCheckBig = createLucideIcon(__iconData$17);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/circle-x.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$16 = {
	name: "circle-x",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "m15 9-6 6",
			key: "1uzhvr"
		}],
		["path", {
			d: "m9 9 6 6",
			key: "z0biqf"
		}]
	],
	aliases: ["x-circle"]
};
__iconData$16.node;
var CircleX = createLucideIcon(__iconData$16);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/clock.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$15 = {
	name: "clock",
	size: 24,
	node: [["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}], ["path", {
		d: "M12 6v6l4 2",
		key: "mmk7yg"
	}]]
};
__iconData$15.node;
var Clock = createLucideIcon(__iconData$15);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/columns-2.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$14 = {
	name: "columns-2",
	size: 24,
	node: [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M12 3v18",
		key: "108xh3"
	}]],
	aliases: ["columns"]
};
__iconData$14.node;
var Columns2 = createLucideIcon(__iconData$14);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/copy.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$13 = {
	name: "copy",
	size: 24,
	node: [["rect", {
		width: "14",
		height: "14",
		x: "8",
		y: "8",
		rx: "2",
		ry: "2",
		key: "17jyea"
	}], ["path", {
		d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
		key: "zix9uf"
	}]]
};
__iconData$13.node;
var Copy = createLucideIcon(__iconData$13);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/ellipsis.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$12 = {
	name: "ellipsis",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["circle", {
			cx: "19",
			cy: "12",
			r: "1",
			key: "1wjl8i"
		}],
		["circle", {
			cx: "5",
			cy: "12",
			r: "1",
			key: "1pcz8c"
		}]
	],
	aliases: ["more-horizontal"]
};
__iconData$12.node;
var Ellipsis = createLucideIcon(__iconData$12);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/external-link.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$11 = {
	name: "external-link",
	size: 24,
	node: [
		["path", {
			d: "M15 3h6v6",
			key: "1q9fwt"
		}],
		["path", {
			d: "M10 14 21 3",
			key: "gplh6r"
		}],
		["path", {
			d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
			key: "a6xqqp"
		}]
	]
};
__iconData$11.node;
var ExternalLink = createLucideIcon(__iconData$11);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/eye-off.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$10 = {
	name: "eye-off",
	size: 24,
	node: [
		["path", {
			d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
			key: "ct8e1f"
		}],
		["path", {
			d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
			key: "151rxh"
		}],
		["path", {
			d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
			key: "13bj9a"
		}],
		["path", {
			d: "m2 2 20 20",
			key: "1ooewy"
		}]
	]
};
__iconData$10.node;
var EyeOff = createLucideIcon(__iconData$10);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/funnel.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$9 = {
	name: "funnel",
	size: 24,
	node: [["path", {
		d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
		key: "sc7q7i"
	}]],
	aliases: ["filter"]
};
__iconData$9.node;
var Funnel = createLucideIcon(__iconData$9);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/info.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$8 = {
	name: "info",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "10",
			key: "1mglay"
		}],
		["path", {
			d: "M12 16v-4",
			key: "1dtifu"
		}],
		["path", {
			d: "M12 8h.01",
			key: "e9boi3"
		}]
	]
};
__iconData$8.node;
var Info = createLucideIcon(__iconData$8);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/menu.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$7 = {
	name: "menu",
	size: 24,
	node: [
		["path", {
			d: "M4 5h16",
			key: "1tepv9"
		}],
		["path", {
			d: "M4 12h16",
			key: "1lakjw"
		}],
		["path", {
			d: "M4 19h16",
			key: "1djgab"
		}]
	]
};
__iconData$7.node;
var Menu = createLucideIcon(__iconData$7);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/mic.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$6 = {
	name: "mic",
	size: 24,
	node: [
		["path", {
			d: "M12 19v3",
			key: "npa21l"
		}],
		["path", {
			d: "M19 10v2a7 7 0 0 1-14 0v-2",
			key: "1vc78b"
		}],
		["rect", {
			x: "9",
			y: "2",
			width: "6",
			height: "13",
			rx: "3",
			key: "s6n7sd"
		}]
	]
};
__iconData$6.node;
var Mic = createLucideIcon(__iconData$6);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/search.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$5 = {
	name: "search",
	size: 24,
	node: [["path", {
		d: "m21 21-4.34-4.34",
		key: "14j7rj"
	}], ["circle", {
		cx: "11",
		cy: "11",
		r: "8",
		key: "4ej97u"
	}]]
};
__iconData$5.node;
var Search = createLucideIcon(__iconData$5);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/square.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$4 = {
	name: "square",
	size: 24,
	node: [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}]]
};
__iconData$4.node;
var Square = createLucideIcon(__iconData$4);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/triangle-alert.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$3 = {
	name: "triangle-alert",
	size: 24,
	node: [
		["path", {
			d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
			key: "wmoenq"
		}],
		["path", {
			d: "M12 9v4",
			key: "juzpu7"
		}],
		["path", {
			d: "M12 17h.01",
			key: "p32p05"
		}]
	],
	aliases: ["alert-triangle"]
};
__iconData$3.node;
var TriangleAlert = createLucideIcon(__iconData$3);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/upload.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$2 = {
	name: "upload",
	size: 24,
	node: [
		["path", {
			d: "M12 3v12",
			key: "1x0j5s"
		}],
		["path", {
			d: "m17 8-5-5-5 5",
			key: "7q97r8"
		}],
		["path", {
			d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
			key: "ih7n3h"
		}]
	]
};
__iconData$2.node;
var Upload = createLucideIcon(__iconData$2);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/wrench.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$1 = {
	name: "wrench",
	size: 24,
	node: [["path", {
		d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
		key: "1ngwbx"
	}]]
};
__iconData$1.node;
var Wrench = createLucideIcon(__iconData$1);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/node_modules/lucide-react/dist/esm/icons/x.mjs
/**
* @license lucide-react v1.61.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData = {
	name: "x",
	size: 24,
	node: [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]]
};
__iconData.node;
var X = createLucideIcon(__iconData);
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/dist/icons.mjs
var import_jsx_runtime = require_jsx_runtime();
var iconProps = {
	size: "1em",
	"aria-hidden": true
};
//#endregion
//#region node_modules/@astryxdesign/theme-neutral/dist/neutral.js
/**
* @generated by `astryx theme build` — do not edit manually.
* Source: src/neutralTheme.ts
* Command: astryx theme build src/neutralTheme.ts --out dist/theme.css
* CLI: @astryxdesign/cli@0.7.3
* Core: @astryxdesign/core@0.7.3
*/
/**
* neutral theme — built by `pnpm exec astryx theme build`
* Import the CSS file alongside this module:
*
*   import { neutralTheme } from './neutral';
*   import './neutral.css';
*/
var neutralTheme = {
	name: "neutral",
	__built: true,
	tokens: {
		"--font-size-4xs": "0.375rem",
		"--font-size-3xs": "0.4375rem",
		"--font-size-2xs": "0.5rem",
		"--font-size-xs": "0.625rem",
		"--font-size-sm": "0.75rem",
		"--font-size-base": "0.875rem",
		"--font-size-lg": "1.0625rem",
		"--font-size-xl": "1.25rem",
		"--font-size-2xl": "1.5rem",
		"--font-size-3xl": "1.8125rem",
		"--font-size-4xl": "2.1875rem",
		"--font-size-5xl": "2.625rem",
		"--text-heading-1-size": "var(--font-size-2xl)",
		"--text-heading-1-weight": "var(--font-weight-semibold)",
		"--text-heading-1-leading": "1.3333",
		"--text-heading-2-size": "var(--font-size-xl)",
		"--text-heading-2-weight": "var(--font-weight-semibold)",
		"--text-heading-2-leading": "1.4",
		"--text-heading-3-size": "var(--font-size-lg)",
		"--text-heading-3-weight": "var(--font-weight-bold)",
		"--text-heading-3-leading": "1.4118",
		"--text-heading-4-size": "var(--font-size-base)",
		"--text-heading-4-weight": "var(--font-weight-bold)",
		"--text-heading-4-leading": "1.4286",
		"--text-heading-5-size": "var(--font-size-sm)",
		"--text-heading-5-weight": "var(--font-weight-semibold)",
		"--text-heading-5-leading": "1.6667",
		"--text-heading-6-size": "var(--font-size-xs)",
		"--text-heading-6-weight": "var(--font-weight-semibold)",
		"--text-heading-6-leading": "1.6",
		"--text-body-size": "var(--font-size-base)",
		"--text-body-weight": "var(--font-weight-normal)",
		"--text-body-leading": "1.4286",
		"--text-large-size": "var(--font-size-lg)",
		"--text-large-weight": "var(--font-weight-semibold)",
		"--text-large-leading": "1.4118",
		"--text-label-size": "var(--font-size-base)",
		"--text-label-weight": "var(--font-weight-medium)",
		"--text-label-leading": "1.4286",
		"--text-code-size": "var(--font-size-base)",
		"--text-code-weight": "var(--font-weight-normal)",
		"--text-code-leading": "1.4286",
		"--text-supporting-size": "var(--font-size-sm)",
		"--text-supporting-weight": "var(--font-weight-normal)",
		"--text-supporting-leading": "1.6667",
		"--text-display-1-size": "var(--font-size-5xl)",
		"--text-display-1-weight": "var(--font-weight-normal)",
		"--text-display-1-leading": "1.2381",
		"--text-display-2-size": "var(--font-size-4xl)",
		"--text-display-2-weight": "var(--font-weight-normal)",
		"--text-display-2-leading": "1.2571",
		"--text-display-3-size": "var(--font-size-3xl)",
		"--text-display-3-weight": "var(--font-weight-normal)",
		"--text-display-3-leading": "1.3793",
		"--duration-fast-min": "95ms",
		"--duration-fast": "125ms",
		"--duration-fast-max": "165ms",
		"--duration-medium-min": "225ms",
		"--duration-medium": "300ms",
		"--duration-medium-max": "400ms",
		"--duration-slow-min": "525ms",
		"--duration-slow": "700ms",
		"--duration-slow-max": "935ms",
		"--font-family-body": "Figtree, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
		"--font-family-heading": "Figtree, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
		"--font-family-code": "ui-monospace, \"SF Mono\", Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace",
		"--color-syntax-keyword": "light-dark(#6b187c, #efa8ff)",
		"--color-syntax-string": "light-dark(#0b5615, #a4d6a3)",
		"--color-syntax-comment": "light-dark(#6a6a6a, #9e9e9e)",
		"--color-syntax-number": "light-dark(#733100, #ffb37e)",
		"--color-syntax-function": "light-dark(#00458c, #a1caff)",
		"--color-syntax-type": "light-dark(#6b187c, #efa8ff)",
		"--color-syntax-variable": "light-dark(#111111, #e2e2e2)",
		"--color-syntax-operator": "light-dark(#6a6a6a, #9e9e9e)",
		"--color-syntax-constant": "light-dark(#733100, #ffb37e)",
		"--color-syntax-tag": "light-dark(#8a0011, #ffaea7)",
		"--color-syntax-attribute": "light-dark(#584400, #eec448)",
		"--color-syntax-property": "light-dark(#005348, #90d7c8)",
		"--color-syntax-punctuation": "light-dark(#6a6a6a, #9e9e9e)",
		"--color-syntax-background": "light-dark(#ffffff, #111111)",
		"--color-syntax-added": "color-mix(in srgb, var(--color-success-muted) 25%, transparent)",
		"--color-syntax-removed": "color-mix(in srgb, var(--color-error-muted) 25%, transparent)",
		"--color-syntax-diff-header": "transparent",
		"--color-syntax-added-marker": "var(--color-syntax-punctuation)",
		"--color-syntax-removed-marker": "var(--color-syntax-punctuation)",
		"--color-background-surface": "light-dark(#ffffff, #262626)",
		"--color-background-body": "light-dark(#f1f1f1, #1b1b1b)",
		"--color-background-card": "light-dark(#ffffff, #1b1b1b)",
		"--color-background-popover": "light-dark(#ffffff, #1b1b1b)",
		"--color-background-muted": "light-dark(#f1f1f1, #1b1b1b)",
		"--color-accent": "light-dark(#1b1b1b, #f1f1f1)",
		"--color-accent-muted": "light-dark(#f1f1f1, #262626)",
		"--color-neutral": "light-dark(#0000000F, #ffffff1A)",
		"--color-overlay": "light-dark(#00000080, #000000CC)",
		"--color-overlay-hover": "light-dark(#0000000D, #ffffff0D)",
		"--color-overlay-pressed": "light-dark(#0000001A, #ffffff1A)",
		"--color-text-primary": "light-dark(#000000, #ffffff)",
		"--color-text-secondary": "light-dark(#474747, #9e9e9e)",
		"--color-text-disabled": "light-dark(#919191, #525252)",
		"--color-text-accent": "light-dark(#1b1b1b, #f1f1f1)",
		"--color-on-dark": "#ffffff",
		"--color-on-light": "#111111",
		"--color-on-accent": "light-dark(#ffffff, #111111)",
		"--color-on-success": "light-dark(#ffffff, #111111)",
		"--color-on-error": "light-dark(#ffffff, #111111)",
		"--color-on-warning": "#111111",
		"--color-icon-accent": "light-dark(#1b1b1b, #f1f1f1)",
		"--color-icon-primary": "light-dark(#000000, #ffffff)",
		"--color-icon-secondary": "light-dark(#6a6a6a, #9e9e9e)",
		"--color-icon-disabled": "light-dark(#919191, #525252)",
		"--color-success": "light-dark(#00490b, #a4d6a3)",
		"--color-error": "light-dark(#76000c, #ffc4be)",
		"--color-warning": "light-dark(#4b3900, #f8d36a)",
		"--color-success-muted": "light-dark(#bce0bb, #90ca903D)",
		"--color-error-muted": "light-dark(#ffc4be, #ff98903D)",
		"--color-warning-muted": "light-dark(#fae19e, #e2b6233D)",
		"--color-border": "light-dark(#00000014, #ffffff1A)",
		"--color-border-emphasized": "light-dark(#d4d4d4, #525252)",
		"--color-skeleton": "light-dark(#f1f1f1, #525252)",
		"--color-shadow": "light-dark(#0000001A, #0000004D)",
		"--color-tint-hover": "light-dark(black, white)",
		"--color-background-red": "light-dark(#ffc4be, #5b2b28)",
		"--color-border-red": "light-dark(#ffaea7, #fa6762)",
		"--color-icon-red": "light-dark(#76000c, #ff9890)",
		"--color-text-red": "light-dark(#76000c, #ffaea7)",
		"--color-background-orange": "light-dark(#ffc7a1, #503424)",
		"--color-border-orange": "light-dark(#ffc7a1, #df843f)",
		"--color-icon-orange": "light-dark(#622700, #ff9e55)",
		"--color-text-orange": "light-dark(#622700, #ffb37e)",
		"--color-background-yellow": "light-dark(#fae19e, #453a1c)",
		"--color-border-yellow": "light-dark(#e3c36c, #c29900)",
		"--color-icon-yellow": "light-dark(#4b3900, #e2b623)",
		"--color-text-yellow": "light-dark(#4b3900, #eec448)",
		"--color-background-green": "light-dark(#bce0bb, #2b422b)",
		"--color-border-green": "light-dark(#aad4a9, #6ab26b)",
		"--color-icon-green": "light-dark(#00490b, #90ca90)",
		"--color-text-green": "light-dark(#00490b, #90ca90)",
		"--color-background-teal": "light-dark(#a9e2d6, #28413c)",
		"--color-border-teal": "light-dark(#90d7c8, #4fb1a0)",
		"--color-icon-teal": "light-dark(#00463d, #81c9bb)",
		"--color-text-teal": "light-dark(#00463d, #90d7c8)",
		"--color-background-cyan": "light-dark(#9ae2f4, #274046)",
		"--color-border-cyan": "light-dark(#85d5e9, #49adc4)",
		"--color-icon-cyan": "light-dark(#004351, #71c7dd)",
		"--color-text-cyan": "light-dark(#004351, #85d5e9)",
		"--color-background-blue": "light-dark(#b9d7ff, #253c5a)",
		"--color-border-blue": "light-dark(#a1caff, #5aa0f8)",
		"--color-icon-blue": "light-dark(#003978, #88bcff)",
		"--color-text-blue": "light-dark(#003978, #a1caff)",
		"--color-background-purple": "light-dark(#f7d5ff, #4a2f51)",
		"--color-border-purple": "light-dark(#f3bfff, #d885eb)",
		"--color-icon-purple": "light-dark(#5c0e6c, #e496f6)",
		"--color-text-purple": "light-dark(#5c0e6c, #eaacf8)",
		"--color-background-pink": "light-dark(#ffc0d7, #572b3d)",
		"--color-border-pink": "light-dark(#ffc0d7, #fc78b1)",
		"--color-icon-pink": "light-dark(#70003f, #fd92bd)",
		"--color-text-pink": "light-dark(#70003f, #ffa9ca)",
		"--color-background-gray": "light-dark(#e2e2e2, #303030)",
		"--color-border-gray": "light-dark(#d4d4d4, #262626)",
		"--color-icon-gray": "light-dark(#474747, #9e9e9e)",
		"--color-text-gray": "light-dark(#1b1b1b, #d4d4d4)",
		"--radius-none": "0px",
		"--radius-inner": "0.375rem",
		"--radius-element": "0.625rem",
		"--radius-container": "0.75rem",
		"--radius-page": "1.75rem",
		"--radius-full": "9999px",
		"--shadow-low": "0 2px 4px light-dark(oklch(0 0 0 / 5%), oklch(0 0 0 / 25%)), 0 4px 8px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 40%)), inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 8%))",
		"--shadow-med": "0 2px 4px light-dark(oklch(0 0 0 / 5%), oklch(0 0 0 / 35%)), 0 4px 12px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 50%)), inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 12%))",
		"--shadow-high": "0 4px 6px light-dark(oklch(0 0 0 / 10%), oklch(0 0 0 / 50%)), 0 12px 24px light-dark(oklch(0 0 0 / 15%), oklch(0 0 0 / 70%)), inset 0 0 0 1px light-dark(transparent, oklch(1 0 0 / 15%))",
		"--shadow-inset-hover": "inset 0px 0px 0px 2px #0074e24D",
		"--shadow-inset-selected": "inset 0px 0px 0px 2px #0074e280",
		"--shadow-inset-success": "inset 0px 0px 0px 2px #2f7d334D",
		"--shadow-inset-warning": "inset 0px 0px 0px 2px #f8d36a4D",
		"--shadow-inset-error": "inset 0px 0px 0px 2px #de47454D"
	},
	localTokens: {
		"--astryx-theme-neutral-color-status-fill-accent": "light-dark(#0074e2, #6d9cfe)",
		"--astryx-theme-neutral-color-status-fill-success": "light-dark(#198100, #64af4c)",
		"--astryx-theme-neutral-color-status-fill-warning": "#ffce2f",
		"--astryx-theme-neutral-color-status-fill-error": "light-dark(#c9303a, #ff705d)",
		"--astryx-theme-neutral-color-status-muted-accent": "light-dark(#b9d7ff, #88bcff3D)",
		"--astryx-theme-neutral-color-on-tint-neutral": "light-dark(#fafafa4D, #0a0a0a4D)",
		"--astryx-theme-neutral-color-on-tint-overlay-hover": "light-dark(#fafafa1A, #0a0a0a1A)",
		"--astryx-theme-neutral-color-on-tint-overlay-pressed": "light-dark(#fafafa33, #0a0a0a33)",
		"--astryx-theme-neutral-color-destructive-overlay-hover": "light-dark(#ff7f770D, #ee736c0D)",
		"--astryx-theme-neutral-color-destructive-overlay-pressed": "light-dark(#ff7f771A, #ee736c1A)"
	},
	__localTokenOwners: {
		"--astryx-theme-neutral-color-status-fill-accent": "neutral",
		"--astryx-theme-neutral-color-status-fill-success": "neutral",
		"--astryx-theme-neutral-color-status-fill-warning": "neutral",
		"--astryx-theme-neutral-color-status-fill-error": "neutral",
		"--astryx-theme-neutral-color-status-muted-accent": "neutral",
		"--astryx-theme-neutral-color-on-tint-neutral": "neutral",
		"--astryx-theme-neutral-color-on-tint-overlay-hover": "neutral",
		"--astryx-theme-neutral-color-on-tint-overlay-pressed": "neutral",
		"--astryx-theme-neutral-color-destructive-overlay-hover": "neutral",
		"--astryx-theme-neutral-color-destructive-overlay-pressed": "neutral"
	},
	__localTokenLineage: ["neutral"],
	components: {
		"heading": {
			"level:1": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-heading-1-size)",
				"fontWeight": "var(--text-heading-1-weight)",
				"lineHeight": "var(--text-heading-1-leading)"
			},
			"level:2": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-heading-2-size)",
				"fontWeight": "var(--text-heading-2-weight)",
				"lineHeight": "var(--text-heading-2-leading)"
			},
			"level:3": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-heading-3-size)",
				"fontWeight": "var(--text-heading-3-weight)",
				"lineHeight": "var(--text-heading-3-leading)"
			},
			"level:4": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-heading-4-size)",
				"fontWeight": "var(--text-heading-4-weight)",
				"lineHeight": "var(--text-heading-4-leading)"
			},
			"level:5": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-heading-5-size)",
				"fontWeight": "var(--text-heading-5-weight)",
				"lineHeight": "var(--text-heading-5-leading)"
			},
			"level:6": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-heading-6-size)",
				"fontWeight": "var(--text-heading-6-weight)",
				"lineHeight": "var(--text-heading-6-leading)"
			},
			"type:display-1": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-display-1-size)",
				"lineHeight": "var(--text-display-1-leading)"
			},
			"type:display-2": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-display-2-size)",
				"lineHeight": "var(--text-display-2-leading)"
			},
			"type:display-3": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-display-3-size)",
				"lineHeight": "var(--text-display-3-leading)"
			}
		},
		"text": {
			"type:body": {
				"fontFamily": "var(--font-family-body)",
				"fontSize": "var(--text-body-size)",
				"lineHeight": "var(--text-body-leading)"
			},
			"type:large": {
				"fontFamily": "var(--font-family-body)",
				"fontSize": "var(--text-large-size)",
				"lineHeight": "var(--text-large-leading)"
			},
			"type:label": {
				"fontFamily": "var(--font-family-body)",
				"fontSize": "var(--text-label-size)",
				"lineHeight": "var(--text-label-leading)"
			},
			"type:code": {
				"fontFamily": "var(--font-family-code)",
				"fontSize": "var(--text-code-size)",
				"lineHeight": "var(--text-code-leading)"
			},
			"type:supporting": {
				"fontFamily": "var(--font-family-body)",
				"fontSize": "var(--text-supporting-size)",
				"lineHeight": "var(--text-supporting-leading)"
			},
			"type:display-1": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-display-1-size)",
				"lineHeight": "var(--text-display-1-leading)"
			},
			"type:display-2": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-display-2-size)",
				"lineHeight": "var(--text-display-2-leading)"
			},
			"type:display-3": {
				"fontFamily": "var(--font-family-heading)",
				"fontSize": "var(--text-display-3-size)",
				"lineHeight": "var(--text-display-3-leading)"
			}
		},
		"button": { "variant:destructive": {
			"backgroundColor": "var(--color-error-muted)",
			"color": "var(--color-error)",
			"--color-overlay-hover": "var(--astryx-theme-neutral-color-destructive-overlay-hover)",
			"--color-overlay-pressed": "var(--astryx-theme-neutral-color-destructive-overlay-pressed)"
		} },
		"badge": {
			"variant:info": {
				"backgroundColor": "var(--astryx-theme-neutral-color-status-fill-accent)",
				"color": "var(--color-on-accent)"
			},
			"variant:neutral": {
				"backgroundColor": "var(--color-background-gray)",
				"color": "var(--color-text-gray)"
			},
			"variant:success": {
				"backgroundColor": "var(--astryx-theme-neutral-color-status-fill-success)",
				"color": "var(--color-on-success)"
			},
			"variant:warning": {
				"backgroundColor": "var(--astryx-theme-neutral-color-status-fill-warning)",
				"color": "var(--color-on-warning)"
			},
			"variant:error": {
				"backgroundColor": "var(--astryx-theme-neutral-color-status-fill-error)",
				"color": "var(--color-on-error)"
			},
			"variant:red": {
				"backgroundColor": "var(--color-background-red)",
				"color": "var(--color-text-red)"
			},
			"variant:orange": {
				"backgroundColor": "var(--color-background-orange)",
				"color": "var(--color-text-orange)"
			},
			"variant:yellow": {
				"backgroundColor": "var(--color-background-yellow)",
				"color": "var(--color-text-yellow)"
			},
			"variant:green": {
				"backgroundColor": "var(--color-background-green)",
				"color": "var(--color-text-green)"
			},
			"variant:teal": {
				"backgroundColor": "var(--color-background-teal)",
				"color": "var(--color-text-teal)"
			},
			"variant:cyan": {
				"backgroundColor": "var(--color-background-cyan)",
				"color": "var(--color-text-cyan)"
			},
			"variant:blue": {
				"backgroundColor": "var(--color-background-blue)",
				"color": "var(--color-text-blue)"
			},
			"variant:purple": {
				"backgroundColor": "var(--color-background-purple)",
				"color": "var(--color-text-purple)"
			},
			"variant:pink": {
				"backgroundColor": "var(--color-background-pink)",
				"color": "var(--color-text-pink)"
			},
			"variant:gray": {
				"backgroundColor": "var(--color-background-gray)",
				"color": "var(--color-text-gray)"
			}
		},
		"status-dot": {
			"variant:success": { "backgroundColor": "var(--astryx-theme-neutral-color-status-fill-success)" },
			"variant:warning": { "backgroundColor": "var(--astryx-theme-neutral-color-status-fill-warning)" },
			"variant:error": { "backgroundColor": "var(--astryx-theme-neutral-color-status-fill-error)" },
			"variant:accent": { "backgroundColor": "var(--astryx-theme-neutral-color-status-fill-accent)" }
		},
		"avatar-status-dot": {
			"variant:success": { "backgroundColor": "var(--astryx-theme-neutral-color-status-fill-success)" },
			"variant:error": { "backgroundColor": "var(--astryx-theme-neutral-color-status-fill-error)" }
		},
		"segmented-control": { "base": { "padding": "var(--spacing-1)" } },
		"segmented-control-item": {
			"size:sm": { "height": "calc(var(--size-element-sm) - 8px)" },
			"size:md": { "height": "calc(var(--size-element-md) - 8px)" },
			"size:lg": { "height": "calc(var(--size-element-lg) - 8px)" },
			"selected": { "boxShadow": "none" }
		},
		"banner": {
			"base": {
				"--color-neutral": "var(--astryx-theme-neutral-color-on-tint-neutral)",
				"--color-overlay-hover": "var(--astryx-theme-neutral-color-on-tint-overlay-hover)",
				"--color-overlay-pressed": "var(--astryx-theme-neutral-color-on-tint-overlay-pressed)"
			},
			"status:info": {
				"--color-accent-muted": "var(--astryx-theme-neutral-color-status-muted-accent)",
				"--color-text-primary": "var(--color-text-blue)",
				"--color-text-secondary": "var(--color-text-blue)",
				"--color-accent": "var(--color-text-blue)"
			},
			"status:success": {
				"--color-text-primary": "var(--color-text-green)",
				"--color-text-secondary": "var(--color-text-green)",
				"--color-success": "var(--color-text-green)"
			},
			"status:warning": {
				"--color-text-primary": "var(--color-text-yellow)",
				"--color-text-secondary": "var(--color-text-yellow)",
				"--color-warning": "var(--color-text-yellow)"
			},
			"status:error": {
				"--color-text-primary": "var(--color-text-red)",
				"--color-text-secondary": "var(--color-text-red)",
				"--color-error": "var(--color-text-red)"
			}
		},
		"step-indicator": {
			"status:accent": { "--color-accent": "var(--astryx-theme-neutral-color-status-fill-accent)" },
			"status:success": { "--color-success": "var(--astryx-theme-neutral-color-status-fill-success)" },
			"status:warning": { "--color-warning": "var(--astryx-theme-neutral-color-status-fill-warning)" },
			"status:error": { "--color-error": "var(--astryx-theme-neutral-color-status-fill-error)" }
		},
		"switch": { "base": { "--color-background-gray": "var(--color-border-emphasized)" } },
		"progress-bar": {
			"base": { "--color-background-muted": "var(--color-border-emphasized)" },
			"variant:accent": { "--color-accent": "var(--astryx-theme-neutral-color-status-fill-accent)" },
			"variant:success": { "--color-success": "var(--astryx-theme-neutral-color-status-fill-success)" },
			"variant:warning": { "--color-warning": "var(--astryx-theme-neutral-color-status-fill-warning)" },
			"variant:error": { "--color-error": "var(--astryx-theme-neutral-color-status-fill-error)" }
		},
		"card": { "base": { "padding": "var(--spacing-3)" } },
		"section": { "base": { "padding": "var(--spacing-3)" } }
	},
	__onDark: { "tokens": {
		"color-scheme": "dark",
		"--color-text-primary": "var(--color-on-dark)",
		"--color-icon-primary": "var(--color-on-dark)",
		"--color-accent": "var(--color-on-dark)"
	} },
	__onLight: { "tokens": {
		"color-scheme": "light",
		"--color-text-primary": "var(--color-on-light)",
		"--color-icon-primary": "var(--color-on-light)",
		"--color-accent": "var(--color-on-light)"
	} },
	__adaptations: {
		"widthBreakpoints": {
			"sm": 640,
			"md": 768,
			"lg": 1024,
			"xl": 1280,
			"2xl": 1536
		},
		"rules": [{
			"when": {
				"pointer": "coarse",
				"width": { "below": "lg" }
			},
			"value": { "typography": { "scale": {
				"base": 16,
				"ratio": 1.1736
			} } }
		}]
	},
	__axes: {
		"typography": {
			"scale": {
				"base": 14,
				"ratio": 1.2
			},
			"body": {
				"family": "Figtree",
				"fallbacks": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif"
			},
			"heading": {
				"family": "Figtree",
				"fallbacks": "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif",
				"weights": {
					"3": "bold",
					"4": "bold"
				}
			},
			"code": {
				"family": "ui-monospace",
				"fallbacks": "\"SF Mono\", Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
			}
		},
		"motion": {
			"fast": 125,
			"medium": 300,
			"slow": 700,
			"ratio": .75
		}
	},
	icons: {
		close: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { ...iconProps }),
		chevronDown: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { ...iconProps }),
		chevronLeft: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { ...iconProps }),
		chevronRight: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { ...iconProps }),
		chevronsLeft: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { ...iconProps }),
		chevronsRight: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, { ...iconProps }),
		check: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { ...iconProps }),
		success: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { ...iconProps }),
		error: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { ...iconProps }),
		warning: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { ...iconProps }),
		info: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { ...iconProps }),
		calendar: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { ...iconProps }),
		clock: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { ...iconProps }),
		externalLink: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { ...iconProps }),
		menu: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { ...iconProps }),
		moreHorizontal: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { ...iconProps }),
		search: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { ...iconProps }),
		upload: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { ...iconProps }),
		arrowUp: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { ...iconProps }),
		arrowDown: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { ...iconProps }),
		arrowsUpDown: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { ...iconProps }),
		funnel: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { ...iconProps }),
		eyeSlash: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { ...iconProps }),
		viewColumns: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Columns2, { ...iconProps }),
		copy: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { ...iconProps }),
		checkDouble: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { ...iconProps }),
		wrench: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { ...iconProps }),
		stop: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { ...iconProps }),
		microphone: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { ...iconProps })
	}
};
//#endregion
export { neutralTheme as t };
