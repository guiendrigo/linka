export function HopNow({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-accent)] ${className}`}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
      agora
    </span>
  );
}
