import { FOOTER_SYSTEM_CONTENT, GPT_MAX_TOKENS, GPT_MODEL_NAME, GPT_TEMPERATURE, SECRET_OPENAI_API_KEY, SYSTEM_CONTENT } from '$env/static/private';
import { Configuration, OpenAIApi, type ChatCompletionRequestMessage } from 'openai';

const configuration = new Configuration({
	apiKey: SECRET_OPENAI_API_KEY
});
const open_ai = new OpenAIApi(configuration);

export async function createChatCompletion(
	document: string[],
	question: string
): Promise<string | null> {
	const messages = [];
	let systemContent = SYSTEM_CONTENT
	systemContent += '\n\n```';
	for (let i = 0; i < document.length; i++) {
		systemContent += '\n' + document[i];
	}
	systemContent +=
		'\n```\n\n' + FOOTER_SYSTEM_CONTENT;

	messages.push({
		role: 'system',
		content: systemContent
	} satisfies ChatCompletionRequestMessage);

	const prompt = question;

	messages.push({
		role: 'user',
		content: prompt
	} satisfies ChatCompletionRequestMessage);

	console.log(messages);
	try {
		const response = await open_ai.createChatCompletion({
			model: GPT_MODEL_NAME,
			messages: messages,
			temperature: Number(GPT_TEMPERATURE),
			max_tokens: Number(GPT_MAX_TOKENS),			
		});

		if (response.data.choices.length > 0) {
			return response.data.choices[0].message?.content || '';
		} else {
			return null;
		}
	} catch (error: any) {
		if (error.response) {
			console.log(error.response.status);
			console.log(error.response.data);
		} else {
			console.log(error.message);
		}
		return null;
	}
}
