// don't import files or modules into this file
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const REDIRECT_PATH = "redirect";
export const REDIRECT_REFRESH_KEY = "session_expired";
export const GQL_URL = `http://${process.env.NEXT_PUBLIC_API_HOSTPORT}/graphql`;

export const ACCESS_TOKEN = "boilerplate.access.token";
export const REFRESH_TOKEN = "boilerplate.refresh.token";
export const LOGIN_TOKEN_KEY = "token";
export const LOGIN_REFRESH_TOKEN_KEY = "refreshToken";
