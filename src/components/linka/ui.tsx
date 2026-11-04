import { Link } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const gapClass: Record<number, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
};

const paddingClass: Record<number, string> = {
  4: "p-4",
};

const maxWidthClass: Record<number, string> = {
  440: "max-w-[440px]",
  448: "max-w-md",
  720: "max-w-[720px]",
};

export function VStack({
  gap = 0,
  padding,
  maxWidth,
  hAlign,
  className,
  children,
}: {
  gap?: number;
  padding?: number;
  maxWidth?: number;
  hAlign?: "center" | "start" | "end";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        gapClass[gap] ?? `gap-${gap}`,
        padding !== undefined ? paddingClass[padding] ?? `p-${padding}` : undefined,
        maxWidth !== undefined ? maxWidthClass[maxWidth] ?? `max-w-[${maxWidth}px]` : undefined,
        hAlign === "center" && "items-center",
        hAlign === "end" && "items-end",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function HStack({
  gap = 0,
  vAlign,
  justify,
  wrap,
  className,
  children,
}: {
  gap?: number;
  vAlign?: "center" | "start" | "end" | "baseline";
  justify?: "between" | "center" | "start" | "end";
  wrap?: boolean | "wrap";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex",
        gapClass[gap] ?? `gap-${gap}`,
        vAlign === "center" && "items-center",
        vAlign === "end" && "items-end",
        vAlign === "baseline" && "items-baseline",
        justify === "between" && "justify-between",
        justify === "center" && "justify-center",
        justify === "end" && "justify-end",
        (wrap === true || wrap === "wrap") && "flex-wrap",
        className,
      )}
    >
      {children}
    </div>
  );
}

const textSize: Record<string, string> = {
  xsm: "text-xs",
  sm: "text-sm",
  lg: "text-lg",
};

export function Text({
  size,
  color,
  weight,
  justify,
  maxLines,
  className,
  children,
}: {
  size?: "xsm" | "sm" | "lg";
  color?: "secondary" | "accent";
  weight?: "medium" | "bold";
  justify?: "center";
  maxLines?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <p
      className={cn(
        "m-0 text-[var(--color-text-primary)]",
        size && textSize[size],
        color === "secondary" && "text-[var(--color-text-secondary)]",
        color === "accent" && "text-[var(--color-text-accent)]",
        weight === "medium" && "font-medium",
        weight === "bold" && "font-bold",
        justify === "center" && "text-center",
        maxLines === 1 && "truncate",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Heading({
  level = 1,
  type,
  justify,
  className,
  children,
}: {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  type?: "display-1" | "display-2" | "display-3";
  justify?: "center";
  className?: string;
  children?: ReactNode;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  return (
    <Tag
      className={cn(
        "font-semibold text-[var(--color-text-primary)]",
        type === "display-1" && "text-3xl leading-tight sm:text-4xl",
        type === "display-2" && "text-2xl leading-tight",
        type === "display-3" && "text-xl leading-tight",
        !type && level === 1 && "text-2xl",
        !type && level === 2 && "text-xl",
        justify === "center" && "text-center",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

const buttonVariantClass: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:brightness-95 active:brightness-90",
  secondary:
    "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-background-body)]",
  ghost:
    "border border-transparent bg-transparent text-[var(--color-text-primary)] hover:bg-black/5",
  destructive:
    "border border-transparent bg-[var(--color-error)] text-white hover:brightness-95",
};

export function Button({
  variant = "primary",
  label,
  icon,
  href,
  target,
  rel,
  width,
  isDisabled,
  isLoading,
  className,
  onClick,
  type = "button",
}: {
  variant?: ButtonVariant;
  label: string;
  icon?: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  width?: "100%" | string;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}) {
  const disabled = isDisabled || isLoading;
  const classes = cn(
    "inline-flex min-h-9 items-center justify-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    buttonVariantClass[variant],
    width === "100%" && "w-full",
    className,
  );
  const content = (
    <>
      {isLoading ? <Loader2 className="size-4 shrink-0 animate-spin" aria-hidden="true" /> : icon}
      <span>{label}</span>
    </>
  );

  if (href && !disabled) {
    const external = href.startsWith("http") || target === "_blank";
    if (external) {
      return (
        <a className={classes} href={href} target={target} rel={rel ?? "noopener noreferrer"}>
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}

export function IconButton({
  variant = "ghost",
  label,
  icon,
  isDisabled,
  onClick,
  className,
}: {
  variant?: ButtonVariant;
  label: string;
  icon: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "ghost" && "hover:bg-black/5",
        className,
      )}
    >
      {icon}
    </button>
  );
}

const cardPadding: Record<number, string> = {
  3: "p-3",
  4: "p-4",
  5: "p-5",
  6: "p-6",
};

export function Card({
  padding,
  elevation,
  className,
  children,
}: {
  padding?: number;
  elevation?: "none" | "low";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-[var(--color-surface)]",
        padding !== undefined ? cardPadding[padding] ?? `p-${padding}` : "p-4",
        elevation === "low" && "shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

const bannerStatus: Record<string, string> = {
  error: "border-[var(--color-error)] bg-[var(--color-error-muted)]",
  success: "border-[var(--color-success)] bg-[var(--color-success-muted)]",
  warning: "border-[var(--color-warning)] bg-[var(--color-warning-muted)]",
  info: "border-[var(--color-border)] bg-[var(--color-accent-muted)]",
};

export function Banner({
  status,
  title,
  description,
}: {
  status: "error" | "success" | "warning" | "info";
  title: string;
  description?: string;
}) {
  return (
    <div
      role="alert"
      className={cn("rounded-xl border px-4 py-3", bannerStatus[status] ?? bannerStatus.info)}
    >
      <p className="text-sm font-medium text-[var(--color-text-primary)]">{title}</p>
      {description ? (
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{description}</p>
      ) : null}
    </div>
  );
}

const badgeVariant: Record<string, string> = {
  success: "bg-[var(--color-success)] text-white",
  neutral: "bg-black/10 text-[var(--color-text-primary)]",
  orange: "bg-[var(--color-background-orange)] text-[var(--color-text-orange)]",
};

export function Badge({ variant, label }: { variant: string; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md px-2 py-0.5 text-xs font-medium",
        badgeVariant[variant] ?? badgeVariant.neutral,
      )}
    >
      {label}
    </span>
  );
}

export function Switch({
  label,
  value,
  isDisabled,
  onChange,
}: {
  label: string;
  value: boolean;
  isDisabled?: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 text-sm text-[var(--color-text-secondary)]",
        isDisabled && "cursor-not-allowed opacity-50",
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={value}
        aria-label={label}
        disabled={isDisabled}
        onClick={() => onChange(!value)}
        className={cn(
          "relative inline-flex h-6 w-10 shrink-0 rounded-full border border-[var(--color-border)] transition-colors",
          value ? "bg-[var(--color-accent)]" : "bg-[var(--color-background-body)]",
        )}
      >
        <span
          className={cn(
            "pointer-events-none absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-transform",
            value ? "translate-x-4" : "translate-x-0.5",
          )}
        />
      </button>
      <span>{label}</span>
    </label>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="mb-1.5 block text-sm font-medium text-[var(--color-text-primary)]">{children}</span>
  );
}

const fieldClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]";

export function TextInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  width,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  width?: "100%" | string;
}) {
  return (
    <label className={cn("block", width === "100%" && "w-full")}>
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass}
      />
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  width,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  width?: "100%" | string;
}) {
  return (
    <label className={cn("block", width === "100%" && "w-full")}>
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={cn(fieldClass, "resize-y min-h-[4.5rem]")}
      />
    </label>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}

const avatarSize: Record<string, string> = {
  md: "size-10 text-sm",
  xl: "size-24 text-2xl",
};

export function Avatar({
  src,
  name,
  size = "md",
  className,
}: {
  src?: string;
  name: string;
  size?: "md" | "xl";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--color-accent-muted)] font-medium text-[var(--color-text-accent)]",
        avatarSize[size],
        className,
      )}
    >
      {src ? (
        <img src={src} alt="" className="size-full object-cover" />
      ) : (
        <span aria-hidden="true">{initials(name)}</span>
      )}
    </div>
  );
}

export function DrawerPanel({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Fechar painel"
        onClick={onClose}
      />
      <div className="relative flex h-full w-full max-w-lg flex-col bg-[var(--color-surface)] shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">{title}</h2>
          <button
            type="button"
            className="rounded-lg px-2 py-1 text-sm text-[var(--color-text-secondary)] hover:bg-black/5"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}
