// For custom domain, replace avec your domain (e.g., https://tongtong-madura.com)
// For now using GitHub Pages URL (change this after custom domain is set up)
export const BASE_URL = process.env.NODE_ENV === "production"
    ? "https://dans-real.github.io"
    : "http://localhost:3000";

export const SITE_NAME = "Tong-Tong Madura Hub";
export const SITE_DESCRIPTION =
    "Digital hub to preserve and explore Tong-Tong culture in Madura";

export const SOCIAL_MEDIA = {
    github: "https://github.com/dans-real",
};
