import TModel from '../models/training';
import type { Training } from '../common-types/training';
import { connectDB } from './connect-db';

export const getTrainings = async (select?: string) => {
  try {
    await connectDB();

    const trainings = await TModel.find().select(select || '');
    return JSON.parse(JSON.stringify(trainings)) as Training[];
  } catch (err) {
    console.log('🎇🎇🎇', err);
    return [] as Training[];
  }
};

export const getTraining = async (slug: string) => {
  try {
    await connectDB();

    const training = await TModel.findOne({ slug });
    return JSON.parse(JSON.stringify(training)) as Training;
  } catch (err) {
    console.log('🎇🎇🎇', err);
    return null;
  }
};
