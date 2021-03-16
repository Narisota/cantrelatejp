export let accessToken = "";

export const setAccessToken = (s: string) => {
    accessToken = s;
};

export const getAccessToken = () => {
    return accessToken;
};

export const setMainAccessToken = (s: string) => {
    accessToken = s;
};

export const getMainAccessToken = () => {
    return accessToken;
};
