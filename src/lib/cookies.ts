import Cookies from "js-cookie";

const TOKEN_KEY = "auth-token";

export const cookieAuth = {
  setToken: (token: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(TOKEN_KEY, token, {
      expires: 7,
      path: "/",
      sameSite: "lax",
      ...options,
    });
  },

  getToken: () => Cookies.get(TOKEN_KEY),

  removeToken: () => {
    Cookies.remove(TOKEN_KEY, { path: "/" });
  },
};
