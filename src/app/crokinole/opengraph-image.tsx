import { ImageResponse } from "next/og";

export const alt = "Crokinole Scorekeeper — track rounds, 20s, and game history";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fafafa 0%, #f4f4f5 100%)",
          fontFamily: "Geist, system-ui, sans-serif",
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "56px" }}>
          {/* Crokinole rink illustration */}
          <svg
            width="380"
            height="380"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="98" fill="#f5e7c5" stroke="#7c5d3a" strokeWidth="2" />
            <circle cx="100" cy="100" r="74" fill="none" stroke="#7c5d3a" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="52" fill="none" stroke="#7c5d3a" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="32" fill="#fff8ec" stroke="#7c5d3a" strokeWidth="1.5" />
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const x = 100 + Math.cos(angle) * 32;
              const y = 100 + Math.sin(angle) * 32;
              return <circle key={i} cx={x} cy={y} r="2.4" fill="#3d2a18" />;
            })}
            <circle cx="100" cy="100" r="11" fill="#d52b1e" stroke="#7c5d3a" strokeWidth="1.5" />
          </svg>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "640px" }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#d52b1e",
                display: "flex",
              }}
            >
              patrickmillegan.com
            </div>
            <div
              style={{
                fontSize: 80,
                fontWeight: 700,
                lineHeight: 1.05,
                color: "#18181b",
                display: "flex",
              }}
            >
              Crokinole Scorekeeper
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 400,
                lineHeight: 1.35,
                color: "#52525b",
                display: "flex",
              }}
            >
              Track rounds, 20s, and game history. Conventional cancellation
              and tournament 2/1/0 scoring.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
