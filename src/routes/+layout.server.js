import * as jwt from '$lib/kanopy-jwt';
import { DB_URL, DB_NAME } from '$env/static/private';
import { MongoClient } from 'mongodb';

/** @satisfies {import('./$types').LayoutServerLoad} */
export const load = async ({ request, cookies }) => {
	const client = new MongoClient(DB_URL);
	await client.connect();
	const cursor = await client.db(DB_NAME).collection('projects').find();
	/** @type {Array<import("$lib/project").Project>} */
	const projects = [];
	for await (const doc of cursor) {
		const simpleDoc = { ...doc, _id: doc._id.toString() };
		// @ts-ignore
		projects.push(simpleDoc);
	}
	await client.close();
	return {
		jwt: jwt.decodeJWT(request),
		lightMode: cookies.get('lightmode') === 'true',
		projects
	};
};
