export default function ProductSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-pulse">
      <div className="aspect-square bg-secondary" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-secondary rounded" />
        <div className="space-y-2">
          <div className="h-4 bg-secondary rounded w-full" />
          <div className="h-4 bg-secondary rounded w-3/4" />
        </div>
        <div className="h-3 w-12 bg-secondary rounded" />
        <div className="h-4 w-20 bg-secondary rounded" />
        <div className="h-6 w-24 bg-secondary rounded" />
        <div className="h-10 bg-secondary rounded w-full" />
      </div>
    </div>
  )
}
