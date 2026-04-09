const express = require('express');
const {
  createRecordByDoctor,
  getMyRecords,
  getPatientRecordsSecure,
  getPatientRecordsForDoctor
} = require('../controllers/recordController');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, restrictTo('doctor'), createRecordByDoctor);
router.get('/my', protect, restrictTo('patient'), getMyRecords);
router.post('/access', protect, restrictTo('patient'), getPatientRecordsSecure);
router.get('/patient/:patientId', protect, restrictTo('doctor'), getPatientRecordsForDoctor);

module.exports = router;
