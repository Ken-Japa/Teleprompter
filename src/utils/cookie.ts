
const DOMAIN_SUFFIX = ".solutionkit.com.br";

export const setSharedCookie = (name: string, value: string, days = 365) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    const isProd = window.location.hostname.endsWith(DOMAIN_SUFFIX);
    const domain = isProd ? `; domain=${DOMAIN_SUFFIX}` : "";
    document.cookie = `${name}=${value}; expires=${expires}; path=/${domain}; samesite=lax${isProd ? "; secure" : ""}`;
};

export const getSharedCookie = (name: string) => {
    return document.cookie.split("; ").find(row => row.startsWith(`${name}=`))?.split("=")[1];
};

export const SHARED_COOKIE_KEYS = {
    PRO_STATUS: "promptninja_pro_shared",
    PRO_TRIAL: "promptninja_trial_shared",
};
