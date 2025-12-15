// Custom domain for production
export const BASE_URL = process.env.NODE_ENV === "production"
    ? "https://tongtongmadura.web.id"
    : "http://localhost:3000";

export const SITE_NAME = "TONGMA - Tong-Tong Madura";
export const SITE_SHORT_NAME = "TONGMA";
export const SITE_DESCRIPTION =
    "Explore and Play Quiz Tong-Tong culture vibes in Madura";

export const SOCIAL_MEDIA = {
    github: "https://github.com/dans-real",
};
