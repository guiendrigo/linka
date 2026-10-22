import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-D41xaRju.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50", {
	variants: { variant: {
		primary: "bg-primary text-primary-fg hover:bg-primary/90",
		ghost: "bg-surface-2 text-fg shadow-ring hover:bg-surface"
	} },
	defaultVariants: { variant: "primary" }
});
function Button({ className, variant, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonVariants({ variant }), className),
		...props
	});
}
//#endregion
export { buttonVariants as n, cn as r, Button as t };
