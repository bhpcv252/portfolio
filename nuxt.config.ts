import glsl from "vite-plugin-glsl";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    css: ["~/assets/styles/global.scss"],
    modules: ["nuxt-svgo", "@nuxtjs/device", "@nuxt/content"],

    svgo: {
        defaultImport: "component",
    },

    content: {
        markdown: {
            remarkPlugins: ["remark-math"],
            rehypePlugins: ["rehype-katex"],
        },
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData:
                        '@use "~/assets/styles/utils.scss" as utils; @use "~/assets/styles/variables.scss" as variables;',
                },
            },
        },
        plugins: [glsl()],
    },

    app: {
        head: {
            meta: [
                {
                    name: "description",
                    content:
                        "I'm a seasoned web developer with a knack for crafting stunning frontend and rock-solid backend solutions. Over the years, I've had the privilege of collaborating with notable clients like Equinox and Tlnthub, bringing their digital visions to life with my expertise.",
                },
                {
                    name: "ogDescription",
                    content:
                        "I'm a seasoned web developer with a knack for crafting stunning frontend and rock-solid backend solutions. Over the years, I've had the privilege of collaborating with notable clients like Equinox and Tlnthub, bringing their digital visions to life with my expertise.",
                },
                { name: "msapplication-TileColor", content: "#f8f8f4" },
                { name: "msapplication-TileImage", content: "/ms-icon-144x144.png" },
                { name: "theme-color", content: "#f8f8f4" },
            ],
            link: [
                {
                    rel: "apple-touch-icon",
                    sizes: "57x57",
                    href: "/apple-icon-57x57.png",
                },
                {
                    rel: "apple-touch-icon",
                    sizes: "60x60",
                    href: "/apple-icon-60x60.png",
                },
                {
                    rel: "apple-touch-icon",
                    sizes: "72x72",
                    href: "/apple-icon-72x72.png",
                },
                {
                    rel: "apple-touch-icon",
                    sizes: "76x76",
                    href: "/apple-icon-76x76.png",
                },
                {
                    rel: "apple-touch-icon",
                    sizes: "114x114",
                    href: "/apple-icon-114x114.png",
                },
                {
                    rel: "apple-touch-icon",
                    sizes: "120x120",
                    href: "/apple-icon-120x120.png",
                },
                {
                    rel: "apple-touch-icon",
                    sizes: "144x144",
                    href: "/apple-icon-144x144.png",
                },
                {
                    rel: "apple-touch-icon",
                    sizes: "152x152",
                    href: "/apple-icon-152x152.png",
                },
                {
                    rel: "apple-touch-icon",
                    sizes: "180x180",
                    href: "/apple-icon-180x180.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "192x192",
                    href: "/android-icon-192x192.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "32x32",
                    href: "/favicon-32x32.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "96x96",
                    href: "/favicon-96x96.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "16x16",
                    href: "/favicon-16x16.png",
                },
                { rel: "manifest", href: "/manifest.json" },
            ],
        },
    },

    compatibilityDate: "2025-01-15",
});
