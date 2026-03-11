export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accentPrimary/20 px-2 py-1 text-xs font-medium text-accentHover ring-1 ring-inset ring-accentPrimary/30">
      {children}
    </span>
  );
}