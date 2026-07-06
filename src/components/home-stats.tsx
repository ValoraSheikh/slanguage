import { getStatusLabel } from "@/lib/status";
import { TERM_STATUSES } from "@/lib/status";

export function HomeStats({
  termCount,
  categoryCount,
}: {
  termCount: number;
  categoryCount: number;
}) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
      <span>
        <strong className="text-foreground">{termCount}</strong> terms
      </span>
      <span>
        <strong className="text-foreground">{categoryCount}</strong> categories
      </span>
      <span className="hidden sm:inline">·</span>
      <span className="hidden sm:inline">
        {TERM_STATUSES.map((s, i) => (
          <span key={s.value}>
            {i > 0 && ", "}
            {getStatusLabel(s.value).toLowerCase()}
          </span>
        ))}
      </span>
    </div>
  );
}
