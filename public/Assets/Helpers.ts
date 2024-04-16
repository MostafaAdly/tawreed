import axios from 'axios'

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api/v1";

const cssExceptions = ["page-body", "supplier-body", "center", "box-shadow", "opacity", "opacity-active", "box-shadow-hover"];
export const _css = (styles, css) => {
    if (css.startsWith("fa-") || css.startsWith("__"))
        return css;
    const array: any = [];
    if (css)
        css.split(" ").forEach(str => cssExceptions.includes(str) ? array.push(str) : array.push(styles[str]));
    return array.join(" ");
}
export const getImage = (path) => {
    return `/api/v1/images/${path}`;
}

export const currentTime = () => new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
export const toFormattedDate = (date = Date.now()) => new Date(date).toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
export const toFormattedDateOnly = (date = Date.now()) => new Date(date).toISOString().split("T")[0];
export const onTabClick = ({
    target,
    styles,
    activatedTabClassName = "activated",
    tabClassName = "tab",
    onTabChange
}: { target: any, styles: any, activatedTabClassName?: string, tabClassName?: string, onTabChange?: Function }) => {
    if (target.nodeName == "P")
        target = target.parentNode;
    if (target.classList.contains(_css(styles, activatedTabClassName))) return;
    [...document.getElementsByClassName(_css(styles, activatedTabClassName))]
        .forEach((tab) => {
            tab.classList.remove(_css(styles, activatedTabClassName));
            const tabId = tab.getAttribute("data-tab-id");
            if (tabId) {
                let tabElement = document.getElementById(tabId);
                if (tabElement)
                    tabElement.style.display = "none";
            }
        });
    target.classList.add(_css(styles, activatedTabClassName));
    const tabId = target.getAttribute("data-tab-id");
    if (tabId) {
        let tabElement = document.getElementById(tabId);
        if (tabElement)
            tabElement.style.display = target.getAttribute("data-default-display") || "flex";
    }
    if (onTabChange)
        onTabChange(target);
}

export const randomList = (list) => {
    return list[Math.floor(Math.random() * list.length)];
}

export const purchaseProduct = async (
    { userId, token, productId, supplierId, customerId, type = "purchase", rfqSettings = {} }
) => {
    try {
        return (await axios.post(`${API_BASE_URL}/product/${type}`, {
            token, productId, userId, supplierId, customerId, type, rfqSettings
        })).data
    } catch (error) {
        return null;
    }
}

export const changeRequestState = async ({ requestId, state, token, userId }) => {
    try {
        return (await axios.post(`${API_BASE_URL}/request`, {
            requestId, state, token, userId
        })).data;
    } catch (error) {
        return null;
    }
}

export const sendDeleteRequest = async ({ requestId, token, userId }) => {
    try {
        return (await axios.delete(`${API_BASE_URL}/request/delete`, {
            data: { requestId, token, userId }
        })).data;
    } catch (error) {
        return null;
    }
}

export const sendComment = async ({ userId, token, productId, content }) => {
    try {
        return (await axios.post(`${API_BASE_URL}/comment`, {
            userId, token, productId, content
        })).data;
    } catch (error) {
        return null;
    }
}

export const getRequestsCount = async ({ customerId, token, userId }) => {
    const def = { total: 0, purchase: 0, rfq: 0 };
    try {
        return (await axios.post(`${API_BASE_URL}/request/count`, {
            customerId, token, userId
        })).data || def;
    } catch (error) {
        return def;
    }
}

export const saveEntityDescription = async ({ userId, token, entityId, description }) => {
    try {
        return (await axios.post(`${API_BASE_URL}/entity/description`, {
            userId, token, entityId, description
        })).data;
    } catch (error) {
        return null;
    }
}
export const saveCategoryDescription = async ({ userId, token, categoryId, description }) => {
    try {
        return (await axios.post(`${API_BASE_URL}/category/description`, {
            userId, token, categoryId, description
        })).data;
    } catch (error) {
        return null;
    }
}