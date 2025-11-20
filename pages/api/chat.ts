import { GoogleGenerativeAI } from '@google/generative-ai';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServices } from '../../utils/services.utils';
import { getTrainings } from '../../utils/trainings.utils';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'GEMINI_API_KEY not set' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Fetch data from database
    const servicesData = await getServices();
    const trainingsData = await getTrainings();

    const servicesContext = JSON.stringify(servicesData.data, null, 2);
    const trainingsContext = JSON.stringify(trainingsData, null, 2);

    const systemPrompt = `
      You are a helpful AI assistant for Hammad's website.
      Your goal is to answer questions about Hammad's trainings and services based on the provided data.
      
      Here is the information about Services:
      ${servicesContext}
      
      Here is the information about Trainings:
      ${trainingsContext}
      
      Rules:
      1. Only answer questions related to the services and trainings provided above.
      2. If you don't know the answer based on the data, politely say so.
      3. Be professional, concise, and helpful.
      4. Format your responses nicely using Markdown (e.g., bullet points, bold text).
      5. Keep responses relatively short unless asked for details.
    `;

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am ready to answer questions about Hammad\'s trainings and services.' }],
        },
        ...(history || []).map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();

    res.status(200).json({ response: text });
  } catch (error: any) {
    console.error('Error in chat API:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
