// Custom domain for production
export const BASE_URL = process.env.NODE_ENV === "production"
    ? "https://tongtongmadura.web.id"
    : "http://localhost:3000";

export const SITE_NAME = "Tong-Tong Madura Hub";
export const SITE_DESCRIPTION =
    "Digital hub to preserve and explore Tong-Tong culture in Madura";

export const SOCIAL_MEDIA = {
    github: "https://github.com/dans-real",
};
