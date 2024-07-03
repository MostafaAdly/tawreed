const cssExceptions = ["auth-page-body", "supplier-page-body", "center", "box-shadow", "opacity", "opacity-active", "box-shadow-hover"];
export const _css = (styles, css) => {
    if (css.startsWith("fa-") || css.startsWith("__"))
        return css;
    const array: any = [];
    if (css)
        css.split(" ").forEach(str => cssExceptions.includes(str) ? array.push(str) : array.push(styles[str]));
    return array.join(" ");
}

export const getAssetImage = (image: string) => {
    if (image == 'logo')
        image = 'logo.png';
    return `${getAPIURL()}/images/${image}`;
}

export const getAPIURL = (url?: string) => `/api/v${process.env.API_VERSION || 1}` + (url ? (url.startsWith('/') ? '' : '/') + url : '');