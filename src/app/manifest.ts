import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${siteConfig.name} – ${siteConfig.defaultTitle}`,
        short_name: siteConfig.name,
        description: siteConfig.defaultDescription,
        start_url: "/",
        display: "standalone",
        background_color: "#02040b",
        theme_color: "#02040b",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "32x32",
                type: "image/x-icon",
            },
        ],
    };
}
