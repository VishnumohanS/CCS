const Record = require('../models/Record');
const User = require('../models/User');
const { encrypt, decrypt, generateHash } = require('../utils/encryption');

const createRecordByDoctor = async (req, res) => {
  const { patientId, title, data, secretCode } = req.body;

  if (!patientId || !title || !data) {
    return res.status(400).json({ message: 'patientId, title and data are required' });
  }

  const patient = await User.findById(patientId);
  if (!patient || patient.role !== 'patient') {
    return res.status(404).json({ message: 'Patient not found' });
  }

  const hash = generateHash(data);
  const encryptedData = encrypt(data);
  const secretCodeHash = secretCode ? generateHash(secretCode) : undefined;

  const record = await Record.create({
    patientId,
    title,
    encryptedData,
    hash,
    secretCodeHash,
    createdByDoctor: req.user._id,
    doctorAccess: [req.user._id]
  });

  res.status(201).json({
    message: 'Report created successfully',
    recordId: record._id,
    patientId: record.patientId,
    hasSecretCode: Boolean(secretCode),
    createdAt: record.createdAt
  });
};

const getMyRecords = async (req, res) => {
  const records = await Record.find({ patientId: req.user._id }).sort({ createdAt: -1 });

  const mappedRecords = records.map(r => ({
    ...r._doc,
    data: decrypt(r.encryptedData)
  }));

  res.json(mappedRecords);
};

const getPatientRecordsSecure = async (req, res) => {
  const { patientId, secretCode } = req.body;

  if (!patientId) {
    return res.status(400).json({ message: 'patientId is required' });
  }

  const isOwnId = patientId.toString() === req.user._id.toString();
  let query = { patientId };

  if (secretCode) {
    query.secretCodeHash = generateHash(secretCode);
  } else if (!isOwnId) {
    return res.status(403).json({
      message: 'Use your own patient ID or provide the correct secret code'
    });
  }

  const records = await Record.find(query).sort({ createdAt: -1 });
  const mappedRecords = records.map(r => ({
    ...r._doc,
    data: decrypt(r.encryptedData)
  }));

  res.json(mappedRecords);
};

const getPatientRecordsForDoctor = async (req, res) => {
  const { patientId } = req.params;
  const records = await Record.find({
    patientId,
    doctorAccess: req.user._id
  }).sort({ createdAt: -1 });

  const mappedRecords = records.map(r => ({
    ...r._doc,
    data: decrypt(r.encryptedData)
  }));

  res.json(mappedRecords);
};

module.exports = {
  createRecordByDoctor,
  getMyRecords,
  getPatientRecordsSecure,
  getPatientRecordsForDoctor
};
