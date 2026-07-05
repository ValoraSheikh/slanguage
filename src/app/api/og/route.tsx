import { ImageResponse } from "next/og";
import { starterTermDTOs } from "@/data/starter-terms";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const term = starterTermDTOs.find((t) => t.slug === slug);

    if (!term) {
      return new ImageResponse(
        (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "hsl(0 0% 100%)",
              fontFamily: "Geist",
            }}
          >
            <div style={{ fontSize: 32, color: "hsl(240 3.8% 46.1%)" }}>
              Slang term not found
            </div>
          </div>
        ),
        { width: 1200, height: 630 },
      );
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "hsl(0 0% 100%)",
            fontFamily: "Geist",
            padding: 80,
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                height: 48,
                width: 48,
                borderRadius: 12,
                background: "hsl(170 65% 42% / 0.1)",
                color: "hsl(170 65% 42%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              S
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: "hsl(170 65% 42%)",
              }}
            >
              Slanguage
            </div>
          </div>

          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "hsl(240 10% 3.9%)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {term.term}
          </div>

          <div
            style={{
              fontSize: 28,
              color: "hsl(240 3.8% 46.1%)",
              lineHeight: 1.5,
              maxWidth: "90%",
            }}
          >
            {term.shortDefinition}
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 24,
            }}
          >
            <div
              style={{
                borderRadius: 9999,
                border: "1px solid hsl(240 5.9% 90%)",
                padding: "8px 20px",
                fontSize: 18,
                color: "hsl(240 3.8% 46.1%)",
              }}
            >
              {term.status}
            </div>
            {term.categorySlugs.slice(0, 2).map((cat) => (
              <div
                key={cat}
                style={{
                  borderRadius: 9999,
                  border: "1px solid hsl(240 5.9% 90%)",
                  padding: "8px 20px",
                  fontSize: 18,
                  color: "hsl(240 3.8% 46.1%)",
                }}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>
      ),
      { width: 1200, height: 630 },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "hsl(0 0% 100%)",
          fontFamily: "Geist",
          padding: 80,
          gap: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              height: 56,
              width: 56,
              borderRadius: 14,
              background: "hsl(170 65% 42% / 0.1)",
              color: "hsl(170 65% 42%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: "hsl(170 65% 42%)",
            }}
          >
            Slanguage
          </div>
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "hsl(240 10% 3.9%)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          Decode internet slang without the brand-account cringe.
        </div>

        <div
          style={{
            fontSize: 28,
            color: "hsl(240 3.8% 46.1%)",
            lineHeight: 1.5,
            maxWidth: "80%",
          }}
        >
          {starterTermDTOs.length} curated terms · Definitions, examples, vibe
          checks · Moderated submissions
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 24,
          }}
        >
          {["dating", "brainrot", "acronyms", "hype", "gaming"].map((vibe) => (
            <div
              key={vibe}
              style={{
                borderRadius: 9999,
                border: "1px solid hsl(240 5.9% 90%)",
                padding: "8px 24px",
                fontSize: 20,
                color: "hsl(240 3.8% 46.1%)",
              }}
            >
              {vibe}
            </div>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
