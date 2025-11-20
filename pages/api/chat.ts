import { GoogleGenerativeAI } from '@google/generative-ai';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServices } from '../../utils/services.utils';
import { getTrainings } from '../../utils/trainings.utils';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'GEMINI_API_KEY not set' });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    // Fetch data from database
    const servicesData = await getServices();
    const trainingsData = await getTrainings();

    const servicesContext = JSON.stringify(servicesData.data, null, 2);
    const trainingsContext = JSON.stringify(trainingsData, null, 2);

    const websiteContext = `
      Owner: Hammad Kakli
      Roles: Amazon Account Manager, PPC Expert, PL Wholesale Dropshipping Expert, Amazon Evangelist Consultant and Trainer.
      
      Contact Information:
      - Email: hammadkakli@gmail.com
      - Phone: (+92) 300 8089934
      
      About Hammad:
      Experienced Professional Freelancer with a demonstrated history of working in the E-Commerce/internet industry.
      He is an Analyst, programmer, troublemaker, executive, revisionist, sales guy, data analyst, system administrator, product owner, evangelist and biker.
      He is interested to scale the business as well as technology and is proud to be involved in the Amazon business to enable young businesses around the globe.
      He is enjoying enabling Pakistan in the field of eCommerce.
      
      Skills:
      Amazon MWS, Amazon PPC, Amazon Listing, All Bulk Operations, Customer Support, A+ Content, Amazon Private Label, Wholesale FBA and Drop-shipping.
      
      Education:
      Bachelor of Science (BS) focused in Computer Science from University of Central Punjab.
    `;

    const systemPrompt = `
      You are a helpful AI assistant for Hammad's website.
      Your goal is to answer questions about Hammad, his contact details, trainings, and services based on the provided data.
      
      Here is the General Website & Contact Information:
      ${websiteContext}

      Here is the information about Services:
      ${servicesContext}
      
      Here is the information about Trainings:
      ${trainingsContext}
      
      Rules:
      1. Answer questions based on the provided Services, Trainings, and General Website Information.
      2. You can provide Hammad's contact details (email, phone) if asked.
      3. If you don't know the answer based on the data, politely say so.
      4. Be professional, concise, and helpful.
      5. Format your responses nicely using Markdown (e.g., bullet points, bold text).
      6. Keep responses relatively short unless asked for details.
    `;

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [
            {
              text: "Understood. I am ready to answer questions about Hammad's trainings and services.",
            },
          ],
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
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
}
