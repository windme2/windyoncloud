import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";

export const alt = "windyoncloud — Intouch Charoenphon | Full-stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Site share image: same night-sky style as the case study images, with the hero cut-out. */
export default async function OpenGraphImage() {
  let portrait: string | null = null;
  try {
    // Satori cannot decode WebP: convert the cut-out to PNG (keeps transparency)
    const file = await readFile(
      path.join(process.cwd(), "public/assets/images/hero-cutout.webp"),
    );
    const png = await sharp(file).resize({ height: 560 }).png().toBuffer();
    portrait = `data:image/png;base64,${png.toString("base64")}`;
  } catch {
    portrait = null;
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "linear-gradient(135deg, #070b2e 0%, #14135a 100%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          width: 700,
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 6, color: "#facc6b" }}>
          PORTFOLIO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 300, lineHeight: 1.02 }}>
            Intouch Charoenphon
          </div>
          <div style={{ fontSize: 34, color: "#a5b4fc", marginTop: 22 }}>
            Software engineer | Full-stack Developer
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#cbd5e1" }}>windyoncloud</div>
      </div>
      {portrait && (
        <img
          src={portrait}
          alt=""
          height={560}
          style={{ position: "absolute", right: 30, bottom: 0 }}
        />
      )}
    </div>,
    size,
  );
}
