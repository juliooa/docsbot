import { createChatCompletion } from '$lib/openai_client';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	let data = await request.json();
	if (data) {
		let query = data.query;
		let documents = data.documents;
		let completion = await createChatCompletion(documents, query);
		if (completion) {
			return json({ answer: completion });
		}
	}
	throw new Error('Invalid request');
}) satisfies RequestHandler;
