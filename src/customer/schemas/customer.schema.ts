import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  address: String,
  created_at: { type: Date, default: Date.now },
});
