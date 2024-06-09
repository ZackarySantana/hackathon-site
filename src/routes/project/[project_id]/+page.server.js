import { DB_URL, DB_NAME } from '$env/static/private';
import { error } from '@sveltejs/kit';
import { MongoClient, ObjectId } from 'mongodb';

/** @satisfies {import('./$types').PageServerLoad} */
export const load = async ({ params, parent }) => {
	const p = await parent();
	const project = p.projects.find((p) => p._id === params.project_id);
	if (!project) {
		error(404, {
			message: 'Not found'
		});
		return;
	}
	return {
		project: p.projects.find((p) => p._id === params.project_id)
	};
};

/** @satisfies {import('./$types').Actions} */
export const actions = {
	addComment: async ({ request }) => {
		const form = await request.formData();
		const projectId = form.get('project_id');
		const email = form.get('email');
		const comment = form.get('comment');

		if (
			!projectId ||
			!email ||
			!comment ||
			projectId.toString() === '' ||
			email.toString() === '' ||
			comment.toString() === ''
		) {
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
					{
						// @ts-ignore
						$push: {
							comments: {
								author: email.toString(),
								text: comment.toString(),
								time: new Date()
							}
						}
					}
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
	removeRequest: async ({ request }) => {
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
					{
						// @ts-ignore
						$pull: {
							requestToJoin: email.toString()
						}
					}
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
	acceptRequest: async ({ request }) => {
		const form = await request.formData();
		const projectId = form.get('project_id');
		const email = form.get('email');

		if (!projectId || !email || projectId.toString() === '' || email.toString() === '') {
			error(404, 'Missing projectId or email');
		}

		try {
			const client = new MongoClient(DB_URL);

			await client.connect();

			const addTeammate = await client
				.db(DB_NAME)
				.collection('projects')
				.updateOne(
					{ _id: ObjectId.createFromHexString(projectId.toString()) },
					{
						// @ts-ignore
						$push: {
							team: email.toString()
						}
					}
				);

			if (!addTeammate) {
				await client.close();
				error(404, 'Project not found');
			}

			const removeRequest = await client
				.db(DB_NAME)
				.collection('projects')
				.updateOne(
					{ _id: ObjectId.createFromHexString(projectId.toString()) },
					{
						// @ts-ignore
						$pull: {
							requestToJoin: email.toString()
						}
					}
				);

			if (!removeRequest) {
				await client.close();
				error(404, 'Project not found');
			}

			await client.close();

			return {};
		} catch (err) {
			error(500, 'Something went wrong ' + err);
		}
	}
};
