import { DB_URL, DB_NAME } from '$env/static/private';
import { error, isRedirect, redirect } from '@sveltejs/kit';
import { MongoClient, ObjectId } from 'mongodb';

/** @satisfies {import('./$types').Actions} */
export const actions = {
	toggleDarkMode: async ({ cookies }) => {
		if (cookies.get('lightmode') === 'true') {
			cookies.set('lightmode', 'false', { path: '/' });
		} else {
			cookies.set('lightmode', 'true', { path: '/' });
		}
	},
	addProject: async ({ request }) => {
		const form = await request.formData();
		/** @type {Record<String, any>} */
		const project = {};
		const tags = [];
		for (const [key, value] of form.entries()) {
			if (value.toString() === 'on') {
				tags.push(key);
				continue;
			}
			if (key === 'team') {
				project[key] = value.toString().split(',');
				// project[key] = value
				// 	.toString()
				// 	.split(',')
				// 	.map((name) => name.toLowerCase().trim().split(' ').join('.') + '@mongodb.com');
				continue;
			}
			project[key] = value.toString();
		}
		project['tags'] = tags;

		project['skunkworks'] = 'Skunktendo';

		project['created_at'] = new Date();
		project['updated_at'] = new Date();

		try {
			const client = new MongoClient(DB_URL);

			await client.connect();

			const p = await client.db(DB_NAME).collection('projects').insertOne(project);

			await client.close();

			return JSON.stringify({
				projectId: p.insertedId.toHexString()
			});
		} catch (err) {
			if (isRedirect(err)) {
				return;
			}
			error(500, 'Something went wrong ' + err);
		}
	},
	editProject: async ({ request }) => {
		const form = await request.formData();
		/** @type {Record<String, any>} */
		const project = {};
		const tags = [];
		for (const [key, value] of form.entries()) {
			if (value.toString() === 'on') {
				tags.push(key);
				continue;
			}
			if (key === 'team') {
				project[key] = value.toString().split(',');
				continue;
			}
			project[key] = value.toString();
		}
		project['tags'] = tags;

		project['updated_at'] = new Date();

		try {
			const client = new MongoClient(DB_URL);

			await client.connect();

			project._id = ObjectId.createFromHexString(project._id);

			await client
				.db(DB_NAME)
				.collection('projects')
				.updateOne({ _id: project._id }, { $set: { ...project } });

			await client.close();

			return JSON.stringify({
				project,
				banner: {
					title: `Project '${project.title}' created`,
					description: ``
				}
			});
		} catch (err) {
			console.error(`Something went wrong trying to insert documents: ${err}\n`);
		}
	},
	deleteProject: async ({ request }) => {
		const form = await request.formData();
		const projectId = form.get('_id');

		if (!projectId || projectId.toString() === '') {
			error(404, 'Missing project ID');
		}

		try {
			const client = new MongoClient(DB_URL);

			await client.connect();

			await client
				.db(DB_NAME)
				.collection('projects')
				.deleteOne({ _id: ObjectId.createFromHexString(projectId.toString()) });

			await client.close();

			redirect(302, '/');
		} catch (err) {
			if (isRedirect(err)) {
				return;
			}
			error(500, 'Something went wrong ' + err);
		}
	},
	joinProject: async ({ request }) => {
		const form = await request.formData();
		const projectId = form.get('project_id');
		const email = form.get('email');

		if (!projectId || !email || projectId.toString() === '' || email.toString() === '') {
			error(404, 'Missing projectId or email');
		}

		try {
			const client = new MongoClient(DB_URL);

			await client.connect();

			const project = await client
				.db(DB_NAME)
				.collection('projects')
				.updateOne(
					{ _id: ObjectId.createFromHexString(projectId.toString()) },
					// @ts-ignore
					{ $push: { requestToJoin: email.toString() } }
				);

			await client.close();

			if (!project) {
				error(404, 'Project not found');
			}
			return {};
		} catch (err) {
			error(500, 'Something went wrong ' + err);
		}
	},
	submitDemo: async ({ request }) => {
		const form = await request.formData();
		const projectId = form.get('_id');
		const demo = form.get('demo');

		if (!projectId || !demo || projectId.toString() === '' || demo.toString() === '') {
			error(404, 'Missing projectId or demo');
		}

		try {
			const client = new MongoClient(DB_URL);

			await client.connect();

			const project = await client
				.db(DB_NAME)
				.collection('projects')
				.updateOne(
					{ _id: ObjectId.createFromHexString(projectId.toString()) },
					{ $set: { demo: demo.toString() } }
				);

			await client.close();

			if (!project) {
				error(404, 'Project not found');
			}
			return {};
		} catch (err) {
			error(500, 'Something went wrong ' + err);
		}
	}
};
