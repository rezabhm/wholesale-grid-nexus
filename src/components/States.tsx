export function ProductCardSkeleton() {
  return (
    <div className="bg-card border border-border animate-pulse">
      <div className="aspect-square bg-surface-alt" />
      <div className="p-2.5 space-y-2">
        <div className="h-4 bg-surface-alt w-1/2" />
        <div className="h-3 bg-surface-alt w-1/3" />
        <div className="h-3 bg-surface-alt w-full" />
        <div className="h-3 bg-surface-alt w-4/5" />
      </div>
    </div>
  );
}

export function RowSkeleton() {
  return <div className="h-16 bg-surface-alt animate-pulse border-b border-border" />;
}

export function EmptyState({ title, description, icon: Icon }: { title: string; description?: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center border border-dashed border-border bg-surface">
      {Icon && <Icon className="h-10 w-10 text-muted-foreground mb-3" />}
      <h3 className="font-semibold text-foreground">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1 max-w-md">{description}</p>}
    </div>
  );
}

export function ErrorState({ message = "Something went wrong" }: { message?: string }) {
  return (
    <div className="border border-destructive/30 bg-destructive/5 text-destructive p-4 text-sm">
      {message}
    </div>
  );
}
