import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-BbZxOCNN.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var gapClass = {
	0: "gap-0",
	1: "gap-1",
	2: "gap-2",
	3: "gap-3",
	4: "gap-4",
	5: "gap-5",
	6: "gap-6"
};
var paddingClass = { 4: "p-4" };
var maxWidthClass = {
	440: "max-w-[440px]",
	448: "max-w-md",
	720: "max-w-[720px]"
};
function VStack({ gap = 0, padding, maxWidth, hAlign, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col", gapClass[gap] ?? `gap-${gap}`, padding !== void 0 ? paddingClass[padding] ?? `p-${padding}` : void 0, maxWidth !== void 0 ? maxWidthClass[maxWidth] ?? `max-w-[${maxWidth}px]` : void 0, hAlign === "center" && "items-center", hAlign === "end" && "items-end", className),
		children
	});
}
function HStack({ gap = 0, vAlign, justify, wrap, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex", gapClass[gap] ?? `gap-${gap}`, vAlign === "center" && "items-center", vAlign === "end" && "items-end", vAlign === "baseline" && "items-baseline", justify === "between" && "justify-between", justify === "center" && "justify-center", justify === "end" && "justify-end", (wrap === true || wrap === "wrap") && "flex-wrap", className),
		children
	});
}
var textSize = {
	xsm: "text-xs",
	sm: "text-sm",
	lg: "text-lg"
};
function Text({ size, color, weight, justify, maxLines, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("m-0 text-[var(--color-text-primary)]", size && textSize[size], color === "secondary" && "text-[var(--color-text-secondary)]", color === "accent" && "text-[var(--color-text-accent)]", weight === "medium" && "font-medium", weight === "bold" && "font-bold", justify === "center" && "text-center", maxLines === 1 && "truncate", className),
		children
	});
}
function Heading({ level = 1, type, justify, className, children }) {
	const Tag = `h${level}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
		className: cn("font-semibold text-[var(--color-text-primary)]", type === "display-1" && "text-3xl leading-tight sm:text-4xl", type === "display-2" && "text-2xl leading-tight", type === "display-3" && "text-xl leading-tight", !type && level === 1 && "text-2xl", !type && level === 2 && "text-xl", justify === "center" && "text-center", className),
		children
	});
}
var buttonVariantClass = {
	primary: "border border-transparent bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:brightness-95 active:brightness-90",
	secondary: "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-body)]",
	ghost: "border border-transparent bg-transparent text-[var(--color-text-primary)] hover:bg-black/5",
	destructive: "border border-transparent bg-[var(--color-error)] text-white hover:brightness-95"
};
function Button({ variant = "primary", label, icon, href, target, rel, width, isDisabled, isLoading, className, onClick, type = "button" }) {
	const disabled = isDisabled || isLoading;
	const classes = cn("inline-flex min-h-9 items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2", "disabled:pointer-events-none disabled:opacity-50", buttonVariantClass[variant], width === "100%" && "w-full", className);
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		className: "size-4 shrink-0 animate-spin",
		"aria-hidden": "true"
	}) : icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })] });
	if (href && !disabled) {
		if (href.startsWith("http") || target === "_blank") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			className: classes,
			href,
			target,
			rel: rel ?? "noopener noreferrer",
			children: content
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: href,
			className: classes,
			children: content
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: classes,
		disabled,
		onClick,
		children: content
	});
}
function IconButton({ variant = "ghost", label, icon, isDisabled, onClick, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		title: label,
		disabled: isDisabled,
		onClick,
		className: cn("inline-flex size-9 items-center justify-center rounded-lg transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]", "disabled:pointer-events-none disabled:opacity-50", variant === "ghost" && "hover:bg-black/5", className),
		children: icon
	});
}
var cardPadding = {
	3: "p-3",
	4: "p-4",
	5: "p-5",
	6: "p-6"
};
function Card({ padding, elevation, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-2xl bg-[var(--color-surface)]", padding !== void 0 ? cardPadding[padding] ?? `p-${padding}` : "p-4", elevation === "low" && "shadow-sm", className),
		children
	});
}
var bannerStatus = {
	error: "border-[var(--color-error)] bg-[var(--color-error-muted)]",
	success: "border-[var(--color-success)] bg-[var(--color-success-muted)]",
	warning: "border-[var(--color-warning)] bg-[var(--color-warning-muted)]",
	info: "border-[var(--color-border)] bg-[var(--color-accent-muted)]"
};
function Banner({ status, title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "alert",
		className: cn("rounded-xl border px-4 py-3", bannerStatus[status] ?? bannerStatus.info),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium text-[var(--color-text-primary)]",
			children: title
		}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-[var(--color-text-secondary)]",
			children: description
		}) : null]
	});
}
var badgeVariant = {
	success: "bg-[var(--color-success)] text-white",
	neutral: "bg-black/10 text-[var(--color-text-primary)]",
	orange: "bg-[var(--color-background-orange)] text-[var(--color-text-orange)]"
};
function Badge({ variant, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-medium", badgeVariant[variant] ?? badgeVariant.neutral),
		children: label
	});
}
function Switch({ label, value, isDisabled, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("inline-flex cursor-pointer items-center gap-2 text-sm text-[var(--color-text-secondary)]", isDisabled && "cursor-not-allowed opacity-50"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "switch",
			"aria-checked": value,
			"aria-label": label,
			disabled: isDisabled,
			onClick: () => onChange(!value),
			className: cn("relative inline-flex h-6 w-10 shrink-0 rounded-full border border-[var(--color-border)] transition-colors", value ? "bg-[var(--color-accent)]" : "bg-[var(--color-background-body)]"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("pointer-events-none absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform", value ? "translate-x-4" : "translate-x-0.5") })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
function FieldLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]",
		children
	});
}
var fieldClass = "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]";
function TextInput({ label, value, onChange, type = "text", placeholder, autoComplete, width }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("block", width === "100%" && "w-full"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type,
			value,
			autoComplete,
			placeholder,
			onChange: (event) => onChange(event.target.value),
			className: fieldClass
		})]
	});
}
function TextArea({ label, value, onChange, placeholder, rows = 3, width }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: cn("block", width === "100%" && "w-full"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			rows,
			placeholder,
			onChange: (event) => onChange(event.target.value),
			className: cn(fieldClass, "resize-y min-h-[4.5rem]")
		})]
	});
}
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}
var avatarSize = {
	md: "size-10 text-sm",
	xl: "size-24 text-2xl"
};
function Avatar({ src, name, size = "md", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-accent-muted)] font-medium text-[var(--color-text-accent)]", avatarSize[size], className),
		children: src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt: "",
			className: "size-full object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			children: initials(name)
		})
	});
}
function DrawerPanel({ open, title, onClose, children }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex justify-end",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": title,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-black/40",
			"aria-label": "Fechar painel",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex h-full w-full max-w-lg flex-col bg-[var(--color-surface)] shadow-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold text-[var(--color-text-primary)]",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "rounded-lg px-2 py-1 text-sm text-[var(--color-text-secondary)] hover:bg-black/5",
					onClick: onClose,
					children: "Fechar"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex min-h-0 flex-1 flex-col",
				children
			})]
		})]
	});
}
//#endregion
export { Card as a, Heading as c, Text as d, TextArea as f, cn as h, Button as i, IconButton as l, VStack as m, Badge as n, DrawerPanel as o, TextInput as p, Banner as r, HStack as s, Avatar as t, Switch as u };
