import axios from 'axios';

const API_KEY = 'sk-proj-iSTYA2YRW0wOcpj9ZOPKT3BlbkFJgQQenkyXYMqITFQteets';
const API_URL = 'https://api.openai.com/v1/chat/completions';

export const askChatbot = async (messages) => {
    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
        try {
            const response = await axios.post(
                API_URL,
                { model: "gpt-3.5-turbo", messages },
                {headers: { Authorization: `Bearer ${API_KEY}` }}        );
            return response.data.choices[0].message.content;
        } catch (error) {
            if (error.response && error.response.status === 429) {
                retryCount++;
                console.log(error);
                const waitTime = Math.pow(2, retryCount) * 1000; // Exponential backoff
                console.log(`Waiting ${waitTime} ms to retry...`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            } else {
                console.error('Error communicating with OpenAI:', error);
                throw error;
            }
        }
    }
    throw new Error('OpenAI request failed after retries.');
};
