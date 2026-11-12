import { ImageResponse } from "next/og";
import { authorName, defaultTitle, ogImageSize } from "@/lib/site";

export const alt = defaultTitle;
export const size = ogImageSize;
export const contentType = "image/png";

const kicker = "software developer · são josé dos campos, br";
const tagline = "Event-driven backends · full-stack apps · cloud-native systems";
const status = "status: open to new roles";

/**
 * Fetches one weight of a Google font as TTF, subset to `text`. The image is
 * prerendered at build time, which already needs Google Fonts for next/font,
 * so this adds no new dependency. Asked without a browser User-Agent, the CSS
 * API serves TrueType — the format the image renderer needs (it cannot read
 * woff2).
 */
async function googleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!src) throw new Error(`No TrueType source for ${family} ${weight}`);
  const response = await fetch(src);
  if (!response.ok) throw new Error(`Font download failed: ${response.status}`);
  return response.arrayBuffer();
}

// The site's own type: Space Grotesk for the name, IBM Plex for the rest.
// If the fonts cannot be fetched the image still renders, in the default font,
// rather than failing the build.
async function loadFonts() {
  try {
    const [display, sans, mono] = await Promise.all([
      googleFont("Space Grotesk", 700, authorName),
      googleFont("IBM Plex Sans", 400, tagline),
      googleFont("IBM Plex Mono", 400, kicker + status),
    ]);
    return [
      { name: "Space Grotesk", data: display, weight: 700 as const, style: "normal" as const },
      { name: "IBM Plex Sans", data: sans, weight: 400 as const, style: "normal" as const },
      { name: "IBM Plex Mono", data: mono, weight: 400 as const, style: "normal" as const },
    ];
  } catch (error) {
    console.warn("opengraph-image: using the default font —", error);
    return undefined;
  }
}

export default async function OpenGraphImage() {
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0f1620",
          color: "#e7ecf0",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "IBM Plex Mono",
            fontSize: 28,
            color: "#8fa0b3",
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "Space Grotesk",
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginTop: 20,
          }}
        >
          {authorName}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "IBM Plex Sans",
            fontSize: 34,
            color: "#8fa0b3",
            marginTop: 28,
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "IBM Plex Mono",
            fontSize: 28,
            color: "#45d9b0",
            marginTop: 48,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: "#45d9b0",
            }}
          />
          {status}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
