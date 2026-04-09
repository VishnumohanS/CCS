const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  encryptedData: { type: String, required: true },
  hash: { type: String, required: true },
  secretCodeHash: { type: String },
  createdByDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorAccess: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Doctors authorized to see this
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Record', recordSchema);
