/** Deterministic pseudo-random so server and client render the same sky. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(2026);
/** One element, many box-shadows: a whole star layer costs a single paint. */
const starField = (count: number) =>
  Array.from({ length: count }, () => {
    const x = (rand() * 100).toFixed(1);
    const y = (rand() * 170).toFixed(1);
    return `${x}vw ${y}vh 0 0 #fff`;
  }).join(", ");

const farStars = starField(90);
const nearStars = starField(34);

/** Cloud sprites are pre-rendered (public/assets/clouds), three depth bands. */
const clouds = [
  // far: small, faint, slow
  { src: "b", top: 10, width: 300, opacity: 0.45, wrap: 0.05, duration: 240, delay: -60, blur: 0 },
  { src: "d", top: 66, width: 320, opacity: 0.45, wrap: 0.06, duration: 260, delay: -20, blur: 0 },
  // mid
  { src: "a", top: 44, width: 600, opacity: 0.7, wrap: 0.14, duration: 180, delay: -90, blur: 0 },
  // near: huge and soft, moves fastest — sells the depth
  { src: "c", top: 84, width: 1000, opacity: 0.75, wrap: 0.26, duration: 140, delay: -100, blur: 2 },
];

/**
 * Fixed sky behind the whole page: layered, drifting clouds by day (light
 * theme) and two twinkling star layers with shooting stars by night (dark).
 * Everything is a static sprite or a single element, moved with transforms
 * only, so it stays on the GPU.
 */
export function SkyBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Day: sky + clouds. Layer opacities follow scroll (morning → afternoon → sunset) */}
      <div className="dark:hidden">
        <div data-sky="m" className="sky-morning absolute inset-0" />
        <div data-sky="a" className="sky-afternoon absolute inset-0" style={{ opacity: 0 }} />
        <div data-sky="s" className="sky-sunset absolute inset-0" style={{ opacity: 0 }} />
        {clouds.map((c, i) => (
          <div
            key={i}
            data-wrap={c.wrap}
            className="absolute left-0"
            style={{
              top: `${c.top}%`,
              width: c.width,
              opacity: c.opacity,
              animation: `cloud-drift ${c.duration}s linear ${c.delay}s infinite`,
              willChange: "transform",
            }}
          >
            <div
              style={{
                aspectRatio: "1300 / 600",
                backgroundImage: `url(/assets/clouds/cloud-${c.src}.webp)`,
                backgroundSize: "100% 100%",
                filter: c.blur ? `blur(${c.blur}px)` : undefined,
              }}
            />
          </div>
        ))}
      </div>

      {/* Night: stars */}
      <div className="hidden dark:block">
        <div data-speed="-0.03" className="absolute inset-0">
          <span className="stars stars-a" style={{ boxShadow: farStars }} />
        </div>
        <div data-speed="-0.09" className="absolute inset-0">
          <span className="stars stars-b" style={{ boxShadow: nearStars }} />
        </div>
        <span className="shooting-star" style={{ left: "78%", top: "12%" }} />
        <span
          className="shooting-star"
          style={{ left: "92%", top: "36%", animationDelay: "4.5s" }}
        />
      </div>
    </div>
  );
}
