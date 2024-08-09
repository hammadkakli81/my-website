import { Service } from '../common-types/service';
import ServiceModal from '../models/service';
import { connectDB } from './connect-db';

export async function getServices(): Promise<{ id: string; data: Service[] }> {
  try {
    await connectDB();
    const {
      services: { data },
      _id: id,
    } = (await ServiceModal.find())[0] as any;

    const services = JSON.parse(JSON.stringify({ id, data }));

    return services;
  } catch (err: any) {
    console.log('✨✨✨', err);
    return { id: '', data: [] };
  }
}
