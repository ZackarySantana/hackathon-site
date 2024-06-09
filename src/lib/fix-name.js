/**
 * @param {string} name
 * @returns {string}
 */
function capatalizeFirstLetter(name) {
	return name.charAt(0).toUpperCase() + name.slice(1);
}
/**
 * Usually names come like first.last, this function will fix it to First Last
 *
 * @param {string | undefined} name
 * @returns {string}
 */
export function fixName(name) {
	if (name === undefined) {
		return '';
	}
	if (!name.includes('.')) {
		return capatalizeFirstLetter(name);
	}
	return name.split('.').map(capatalizeFirstLetter).join(' ');
}
