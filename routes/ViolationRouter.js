const express = require('express');
const router = express.Router();
const DroneController = require('../controllers/DroneController');
const PilotController = require('../controllers/PilotController');
const ViolationController = require('../controllers/ViolationController');


router.get('/getViolationInfos', ViolationController.getViolationInfos);


router.get('/updateViolationInfos', ViolationController.updateViolationInfos);


//========For development convenience================
router.get('/getAllDrones', DroneController.getAllDrones);


router.get('/getPilotBySerialNumber', PilotController.getPilotBySerialNumber);


module.exports = router;