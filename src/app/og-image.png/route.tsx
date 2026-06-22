import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    alignItems: "center",
                    background:
                        "radial-gradient(circle at 18% 18%, #1d4ed8 0, transparent 32%), radial-gradient(circle at 78% 30%, #0891b2 0, transparent 30%), linear-gradient(135deg, #02040b 0%, #07111f 52%, #02040b 100%)",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: "Inter, Arial, sans-serif",
                    height: "100%",
                    justifyContent: "center",
                    letterSpacing: 0,
                    padding: "72px",
                    width: "100%",
                }}
            >
                <div
                    style={{
                        alignItems: "center",
                        border: "1px solid rgba(255,255,255,0.14)",
                        borderRadius: "32px",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "space-between",
                        padding: "56px",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            alignItems: "center",
                            display: "flex",
                            fontSize: 34,
                            fontWeight: 700,
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <span>JobBridge</span>
                        <span style={{ color: "#bfdbfe", fontSize: 28, fontWeight: 500 }}>
                            Die digitale Taschengeldbörse
                        </span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 26, width: "100%" }}>
                        <div
                            style={{
                                fontSize: 88,
                                fontWeight: 800,
                                lineHeight: 0.96,
                                maxWidth: 860,
                            }}
                        >
                            Sichere Taschengeldjobs für Jugendliche
                        </div>
                        <div
                            style={{
                                color: "#dbeafe",
                                fontSize: 36,
                                lineHeight: 1.28,
                                maxWidth: 880,
                            }}
                        >
                            Verifizierte Auftraggeber, klare Freigaben und volle Transparenz für Eltern.
                        </div>
                    </div>

                    <div
                        style={{
                            alignItems: "center",
                            color: "#67e8f9",
                            display: "flex",
                            fontSize: 28,
                            fontWeight: 700,
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <span>jobbridge.app</span>
                        <span>Deutschlandweit gedacht</span>
                    </div>
                </div>
            </div>
        ),
        size,
    );
}
