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


export const onTabClick = ({
    target,
    styles,
    activatedTabClassName = "activated",
    tabClassName = "tab"
}) => {
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
}

export const randomList = (list) => {
    return list[Math.floor(Math.random() * list.length)];
}