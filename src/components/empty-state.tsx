export function EmptyState({ query }: { query?: string }) {
  if (query) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No results for &ldquo;{query}&rdquo;.
      </p>
    );
  }
  return (
    <p className="py-8 text-center text-sm text-muted-foreground">
      No entries yet.
    </p>
  );
}
