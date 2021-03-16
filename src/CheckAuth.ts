import { getAccessToken, getMainAccessToken } from "./accessToken";
import jwtDecode from "jwt-decode";

export const checkAuth = () => {
    const token = getAccessToken();
    if (!token) {
        return false;
    }
    try {
        const { exp } = jwtDecode(token) as any;
        if (Date.now() >= exp * 1000) {
            return false;
        } else {
            return true;
        }
    } catch {
        return false;
    }
};

export const checkMainAuth = () => {
    const token = getMainAccessToken();
    if (!token) {
        return false;
    }
    try {
        const { exp } = jwtDecode(token) as any;
        if (Date.now() >= exp * 1000) {
            return false;
        } else {
            return true;
        }
    } catch {
        return false;
    }
};

export default checkAuth();
