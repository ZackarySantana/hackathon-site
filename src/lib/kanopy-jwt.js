import jsonwebtoken from 'jsonwebtoken';

/**
 * @typedef {Object} JWTHeader
 * @property {string} alg - Algorithm used to sign the token, e.g., "RS256".
 * @property {string} kid - Key ID used to identify the public key that should be used to verify the token.
 * @property {string} typ - Type of the token, e.g., "JWT".
 */

/**
 * @typedef {Object} JWTPayload
 * @property {string} iss - Issuer of the token.
 * @property {string} sub - Subject of the token (typically the user id).
 * @property {number} exp - Expiry date/time of the token.
 * @property {number} nbf - Date/time before which the token must not be accepted.
 * @property {number} iat - Issued at date/time.
 * @property {string} jti - JWT ID, a unique identifier for the token.
 * @property {string} email - Email of the user.
 * @property {Array<string>} groups - Groups the user belongs to.
 * @property {string} client_ip - IP address of the client from which the request originated.
 */

/**
 * @typedef {Object} JWT
 * @property {JWTHeader} header - Header of the JWT.
 * @property {JWTPayload} payload - Payload of the JWT, containing claims about the entity and additional metadata.
 * @property {string} signature - Signature to verify the token's integrity and authenticity.
 */

/**
 * Decodes the JWT from the request headers and returns it.
 *
 * @param {Request} request - The incoming HTTP request.
 * @returns {JWT | null} - The decoded JWT or null if decoding fails.
 */
export function decodeJWT(request) {
	const token = request.headers.get('X-Kanopy-Internal-Authorization');

	if (!token) {
		console.error('No JWT provided');
		return null;
	}

	try {
		// Decode JWT without verification to obtain the complete token
		const decodedToken = jsonwebtoken.decode(token, { complete: true });

		if (!decodedToken) {
			throw new Error('Invalid JWT');
		}

		// Construct the JWT object from decoded data
		const jwtObject = {
			header: JSON.parse(JSON.stringify(decodedToken.header)),
			payload: JSON.parse(JSON.stringify(decodedToken.payload)),
			signature: decodedToken.signature
		};

		return jwtObject;
	} catch (error) {
		console.error('Failed to decode JWT:', error);
		return null;
	}
}
