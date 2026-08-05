import mongoose from "mongoose";

const questSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  quests: [{
    id: Number,
    name: String,
    target: Number,
    progress: { type: Number, default: 0 },
    rewardXP: Number,
    rewardCoins: Number,
    completed: { type: Boolean, default: false }
  }]
});

export default mongoose.model('Quest', questSchema);