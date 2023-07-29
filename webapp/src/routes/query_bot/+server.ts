import { createChatCompletion } from '$lib/openai_client';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ request }) => {
	const data = await request.json();
	if (data) {
		const query = data.query;
		const documents = data.documents;
		const completion = await createChatCompletion(documents, query);
		if (completion) {
			return json({ answer: completion });
		}
	}
	throw new Error('Invalid request');
}) satisfies RequestHandler;
