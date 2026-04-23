import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          background: "#ffffff",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Left accent bar */}
        <div style={{ width: "12px", background: "#1a5c9e", flexShrink: 0 }} />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 72px",
            background: "linear-gradient(135deg, #f0f6ff 0%, #ffffff 60%)",
          }}
        >
          {/* Tagline */}
          <div
            style={{
              fontSize: "18px",
              color: "#1a5c9e",
              fontFamily: "Arial, sans-serif",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "20px",
              fontWeight: 600,
            }}
          >
            Kauvery Hospital · Bengaluru
          </div>

          {/* Name headline */}
          <div
            style={{
              fontSize: "76px",
              fontWeight: 700,
              color: "#0f172a",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Dr. Nishanth S
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "28px",
              color: "#334155",
              fontFamily: "Arial, sans-serif",
              fontWeight: 400,
              marginBottom: "24px",
            }}
          >
            Consultant Urologist &amp; Uro-Oncologist
          </div>

          {/* Specialities */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            {["Robotic Surgery", "Renal Transplant", "Uro-Oncology"].map((s) => (
              <div
                key={s}
                style={{
                  background: "#1a5c9e",
                  color: "#ffffff",
                  borderRadius: "999px",
                  padding: "8px 20px",
                  fontSize: "16px",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: 500,
                }}
              >
                {s}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: "#e8f0fa",
                border: "2px solid #1a5c9e",
                color: "#1a5c9e",
                borderRadius: "10px",
                padding: "12px 28px",
                fontSize: "18px",
                fontFamily: "Arial, sans-serif",
                fontWeight: 700,
              }}
            >
              Book a Consultation →
            </div>
          </div>
        </div>

        {/* Right blue panel */}
        <div
          style={{
            width: "320px",
            background: "linear-gradient(180deg, #1a5c9e 0%, #0d3d6e 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            padding: "40px 24px",
          }}
        >
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "4px solid rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <div style={{ fontSize: "64px" }}>👨‍⚕️</div>
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: "16px",
              textAlign: "center",
              fontFamily: "Arial, sans-serif",
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            MBBS · MS · MCh
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "14px",
              textAlign: "center",
              fontFamily: "Arial, sans-serif",
              marginTop: "8px",
            }}
          >
            drnishanths.netlify.app
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
