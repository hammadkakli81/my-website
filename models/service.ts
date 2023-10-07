import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  services: {
    data: [
      {
        name: {
          type: String,
          required: [true, 'Please enter service name'],
        },
        slug: {
          type: String,
          required: [true, 'Please enter service slug'],
        },
      },
    ],
  },
});

const ServiceModal =
  mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default ServiceModal;
