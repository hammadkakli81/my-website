import fs from 'fs/promises';
import path from 'path';
import { Training } from '../common-types/training';

const SERVICES_PATH = path.join(process.cwd(), 'data', 'all-trainings.json');

export async function getTrainings(): Promise<Training[]> {
  try {
    const services = JSON.parse(
      await fs.readFile(SERVICES_PATH, 'utf-8')
    ) as Training[];

    return services;
  } catch (err: any) {
    console.log('✨✨✨', err);
    return [] as Training[];
  }
}
