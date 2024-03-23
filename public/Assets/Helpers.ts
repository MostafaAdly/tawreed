export const css = (styles, css) => {
    const array: any = [];
    if (css)
        css.split(" ").forEach(str => array.push(styles[str]))
    return array.join(" ");
}