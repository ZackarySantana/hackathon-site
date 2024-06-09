/**
 * @typedef {Object} Project
 * @property {string} _id - Id of the project
 * @property {string} projectName - Name of the project
 * @property {string} description - Description of the project
 * @property {string} author - Author of the project
 * @property {string} skunkworks - The Skunkworks this project belongs to
 * @property {string=} demo - The link to the demo of the project
 * @property {Array<string>} tags - Tags of the project
 * @property {Array<string>} team - People working on the project
 * @property {Array<Comment>} comments - People working on the project
 * @property {Array<string>} requestToJoin - Requests to join this project
 */

/**
 * @typedef {Object} Comment // will have time, author email, and comment text
 * @property {string} author - Author of the comment
 * @property {string} text - Text of the comment
 * @property {string} time - Time of the comment
 */

export const Types = {};
