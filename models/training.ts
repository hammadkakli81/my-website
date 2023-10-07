import mongoose from 'mongoose';

const descriptionSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please enter description name'] },
    furtherDesc: [String],
  },
  { _id: false }
);

const trainingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter training name'],
  },
  excerptDesc: {
    type: String,
    required: [true, 'Please enter excerptDescription'],
  },
  slug: String,
  description: [descriptionSchema],
});

const Training =
  mongoose.models.Training || mongoose.model('Training', trainingSchema);

export default Training;
