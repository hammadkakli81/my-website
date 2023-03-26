import fs from 'fs/promises';
import path from 'path';
import { Service } from '../common-types/service';

const SERVICES_PATH = path.join(process.cwd(), 'data', 'all-services.json');

export async function getServices(): Promise<Service[]> {
  try {
    const services = JSON.parse(
      await fs.readFile(SERVICES_PATH, 'utf-8')
    ) as Service[];

    return services;
  } catch (err: any) {
    console.log('✨✨✨', err);
    return [] as Service[];
  }
}
