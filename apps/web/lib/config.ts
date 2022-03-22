// don't import files or modules into this file
const { APP_ENV } = process.env;
let env = APP_ENV as "production" | "development";

if (!env) {
  const hostname = typeof window !== "undefined" && window?.location?.hostname;
  env = "development";
  if (hostname) {
    if (hostname.includes("boilerplate")) {
      env = "production";
    }
  }
}

export const IS_PRODUCTION = env === "production";
export const IS_DEV = !IS_PRODUCTION;
export const REDIRECT_PATH = "redirect";
export const REDIRECT_REFRESH_KEY = "session_expired";

export const API_URL = "http://localhost:4000/graphql";

export const WEB_URL = "localhost:3000";

export const ACCESS_TOKEN = "boilerplate.access.token";
export const REFRESH_TOKEN = "boilerplate.refresh.token";
export const LOGIN_TOKEN_KEY = "token";
export const LOGIN_REFRESH_TOKEN_KEY = "refreshToken";
