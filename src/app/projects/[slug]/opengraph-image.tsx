import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { projects } from "@/data/projects";

export const alt = "Case study — windyoncloud";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/** Share image per case study: title on the left, the project screenshot on the right. */
export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const [name, tagline] = (project?.title ?? "windyoncloud").split(" - ");

  let shot: string | null = null;
  if (project) {
    try {
      // Satori cannot decode WebP, so the screenshot is converted to a small JPEG first
      const file = await readFile(path.join(process.cwd(), "public", project.image));
      const jpeg = await sharp(file).resize(1200, 750, { fit: "cover" }).jpeg({ quality: 82 }).toBuffer();
      shot = `data:image/jpeg;base64,${jpeg.toString("base64")}`;
    } catch {
      shot = null;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #070b2e 0%, #14135a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, width: 560 }}>
          <div style={{ fontSize: 24, letterSpacing: 6, color: "#facc6b" }}>CASE STUDY</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 72, fontWeight: 300, lineHeight: 1.05 }}>{name}</div>
            {tagline && <div style={{ fontSize: 30, color: "#a5b4fc", marginTop: 20 }}>{tagline}</div>}
          </div>
          <div style={{ fontSize: 24, color: "#cbd5e1" }}>windyoncloud · Intouch Charoenphon</div>
        </div>
        {shot && (
          <div style={{ display: "flex", alignItems: "center", flex: 1, paddingRight: 48 }}>
            <img
              src={shot}
              alt=""
              width={600}
              height={375}
              style={{ borderRadius: 20, objectFit: "cover", boxShadow: "0 30px 60px rgba(0,0,0,0.45)" }}
            />
          </div>
        )}
      </div>
    ),
    size,
  );
}
