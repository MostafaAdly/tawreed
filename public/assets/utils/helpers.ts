import path from "path";

export const getAssetImage = (image: string) => {
    if (image == 'logo')
        image = 'logo.png';
    return `${getAPIURL()}/images/${image}`;
}

export const getAPIURL = () => `/api/v${process.env.API_VERSION || 1}`;