import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['spend', 'earn'], required: true },
  amount: Number,
  description: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', transactionSchema);