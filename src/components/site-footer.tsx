import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t py-6 text-center text-xs text-muted-foreground">
      Slanguage
      {" · "}
      <Link href="/terms" className="hover:text-foreground transition-colors">
        Index
      </Link>
      {" · "}
      <Link href="/categories" className="hover:text-foreground transition-colors">
        Categories
      </Link>
      {" · "}
      <Link href="/submit" className="hover:text-foreground transition-colors">
        Submit
      </Link>
    </footer>
  );
}
