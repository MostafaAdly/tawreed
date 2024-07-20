import { GetServerSideProps } from "next";

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

export const isClientUser = (user) => {
    return user && user.type == 'Client';
}

export const isSupplierUser = (user) => {
    return user && user.type == 'Supplier';
}

export const getFormData = (formId): FormData => {
    return new FormData(document.getElementById(formId) as HTMLFormElement);
}