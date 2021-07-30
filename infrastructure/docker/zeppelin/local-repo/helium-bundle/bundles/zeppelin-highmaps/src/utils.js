/**
 * Checks is given numbers are same.
 * NaN is equal NaN in this case.
 * @param {number} a
 * @param {number} b
 * @returns {boolean}
 */
export function isSameNumber(a, b) {
    return isNaN(a) && isNaN(b) || a === b;
}


/**
 * Parses given string as html and returns created DOM elements within HTMLCollection.
 * @param {string} html
 * @returns {HTMLCollection}
 */
export function parseHTML(html) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, "text/html");
    const elements = doc.querySelectorAll('body > *');
    return elements;
}
