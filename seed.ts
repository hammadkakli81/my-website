import mongoose from 'mongoose';
import { allTrainings } from './data/all-trainings';
import { allServices } from './data/all-services';
import TModel from './models/training';
import SModel from './models/service';

let num = 1;

const wait = (t: number) => new Promise(r => setTimeout(r, t));
mongoose.connect(process.env.DB_URL!).then(async () => {
  console.log('🚀🚀 Connected');
  /*
  
let num = 0;
const wait = (t: number) => new Promise(r => setTimeout(r, t));
const umer = async () => {
  for (const training of allTrainings) {
    await TModel.create(training);
    await wait(1000);
    console.log('Done # ' + num);
    num++;
  }
  console.log('Completed');
};
umer();


  await connectDB();
  await ServiceModal.create({ services: { data: allServices } });
  console.log('done');
  */

  console.log('Done Completely');
});
