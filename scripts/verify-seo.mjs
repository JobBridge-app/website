import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const appDir = path.join(root, "src/app");
const sitemapSource = readFileSync(path.join(root, "src/app/sitemap.ts"), "utf8");
const robotsSource = readFileSync(path.join(root, "src/app/robots.ts"), "utf8");
const insightRouteSource = readFileSync(path.join(root, "src/app/einblicke/[slug]/page.tsx"), "utf8");

function walkPages(dir, files = []) {
    for (const entry of readdirSync(dir)) {
        const absolute = path.join(dir, entry);
        const stats = statSync(absolute);

        if (stats.isDirectory()) {
            walkPages(absolute, files);
            continue;
        }

        if (entry === "page.tsx") {
            files.push(absolute);
        }
    }

    return files;
}

function routeFromPage(file) {
    const relativeDir = path.relative(appDir, path.dirname(file));
    if (!relativeDir) return "/";

    return `/${relativeDir
        .split(path.sep)
        .filter((segment) => !segment.startsWith("("))
        .join("/")}`;
}

function isRedirectPage(source) {
    return source.includes("redirect(") || source.includes("permanentRedirect(");
}

function isNoindexPage(source) {
    return /robots:\s*{[^}]*index:\s*false/s.test(source);
}

const errors = [];
const staticPages = walkPages(appDir)
    .map((file) => ({
        file,
        route: routeFromPage(file),
        source: readFileSync(file, "utf8"),
    }))
    .filter((page) => !page.route.includes("["));

for (const page of staticPages) {
    if (isRedirectPage(page.source) || isNoindexPage(page.source)) {
        continue;
    }

    if (page.route.startsWith("/team/") && sitemapSource.includes("teamMembers")) {
        continue;
    }

    const expectedNeedle = page.route === "/" ? "url: baseUrl" : page.route;
    if (!sitemapSource.includes(expectedNeedle)) {
        errors.push(`Missing sitemap entry for static route ${page.route} (${path.relative(root, page.file)})`);
    }
}

if (robotsSource.includes("/_next/")) {
    errors.push("robots.ts must not disallow /_next/ assets; Google needs render assets crawlable.");
}

if (!sitemapSource.includes("allInsights") || !sitemapSource.includes("teamMembers")) {
    errors.push("sitemap.ts must derive dynamic insight and team URLs from content data.");
}

if (!insightRouteSource.includes("allInsights") || !insightRouteSource.includes("dynamicParams = false")) {
    errors.push("einblicke/[slug] must statically enumerate all insight slugs and reject unknown slugs.");
}

if (errors.length > 0) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exit(1);
}

console.log(`SEO verification passed for ${staticPages.length} static app pages.`);
