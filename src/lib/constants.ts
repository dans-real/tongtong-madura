// Custom domain for production
export const BASE_URL = process.env.NODE_ENV === "production"
    ? "https://tongtongmadura.web.id"
    : "http://localhost:3000";

export const SITE_NAME = "Tong-Tong Madura";
export const SITE_DESCRIPTION =
    "Djaga Imbauan dan explore Tong-Tong culture in Madura";

export const SOCIAL_MEDIA = {
    github: "https://github.com/dans-real",
};
