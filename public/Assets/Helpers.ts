const cssExceptions = ["page-body", "supplier-body", "center", "box-shadow", "box-shadow-hover"];
export const _css = (styles, css) => {
    if (css.startsWith("fa-") || css.startsWith("__"))
        return css;
    const array: any = [];
    if (css)
        css.split(" ").forEach(str => cssExceptions.includes(str) ? array.push(str) : array.push(styles[str]));
    return array.join(" ");
}