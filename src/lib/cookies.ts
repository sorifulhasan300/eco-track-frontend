import Cookies from "js-cookie";

const TOKEN_KEY = "auth-token";
const ROLE_KEY = "user-role";

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

  setRole: (role: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(ROLE_KEY, role, {
      expires: 7,
      path: "/",
      sameSite: "lax",
      ...options,
    });
  },

  getRole: () => Cookies.get(ROLE_KEY),

  removeRole: () => {
    Cookies.remove(ROLE_KEY, { path: "/" });
  },
};
