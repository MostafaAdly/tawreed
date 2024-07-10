import { GetServerSideProps } from "next";

const cssExceptions = ["auth-page-body", "supplier-page-body", "center", "box-shadow", "opacity", "opacity-active", "box-shadow-hover"];
export const _css = (styles, css) => {
    if (css.startsWith("fa-") || css.startsWith("__"))
        return css;
    const array: string[] = [];
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

export const getSSProps: GetServerSideProps = async (context) => {
    try {
        var props = JSON.parse((context.query.data as string) || '{}');
    } catch (error) {
        console.error(error);
        props = {};
    }
    return {
        props
    };
}

export const isClientSide = () => typeof window != 'undefined';

export const getElementById = (id: string) => {
    return isClientSide() ? document.getElementById(id) : null;
}