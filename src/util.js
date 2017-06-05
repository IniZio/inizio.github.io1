// @flow
/**
 * Reduce your object
 *
 * @export
 * @param {object} obj
 * @param {string[]} scopeArr
 * @returns {object}
 */
export function objReduce (obj: Object, scopeArr: string[]): Object {
  return Object.keys(obj)
    .filter(el => scopeArr.indexOf(el) !== -1)
    .reduce((res, key) => {
      res[key] = obj[key]
      return res
    }, {})
}

/**
 * get title from file name
 *
 * @export
 * @param {string} title
 * @returns {string}
 */
export function onlyTitle (title: string): string {
  return title.replace(/\.md$/, '').replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '')
}

/**
 * get publish date from file name
 *
 * @export
 * @param {string} title
 * @returns
 */
export function onlyDate (title: string): string {
  return /^\d{4}-\d{1,2}-\d{1,2}/.exec(title)
    ? /^\d{4}-\d{1,2}-\d{1,2}/.exec(title)[0]
    : ''
}

/**
 * Capitalize string
 *
 * @export
 * @param {string} sentence
 * @returns {string}
 */
export function capitalize (sentence: string): string {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1)
}

/**
 * Set query parameter
 *
 * @param {any} uri
 * @param {any} key
 * @param {any} val
 * @returns
 */
export function setParam (uri: string, key: string, val: string) {
  return uri
    .replace(
      RegExp('([?&]' + key + '(?=[=&#]|$)[^#&]*|(?=#|$))'),
      '&' + key + '=' + encodeURIComponent(val)
    )
    .replace(/^([^?&]+)&/, '$1?')
}
