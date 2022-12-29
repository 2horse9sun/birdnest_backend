const express = require('express');
const router = express.Router();
const {getAllDrones} = require('../controller/drone');
const {getPilotBySerialNumber} = require('../controller/pilot');
const {saveViolationInfos, getViolationInfos} = require('../controller/violation');
const {updateViolationInfos} = require('../job/updateViolationInfos');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


router.get('/getViolationInfos', async (req, res, next) => {
    const violationRes = await getViolationInfos();
    return res.json(violationRes);
});


router.get('/updateViolationInfos', async (req, res, next) => {
    const updateRes = await updateViolationInfos();
    return res.json(updateRes);
});


//========For development convenience================
router.get('/getAllDrones', async (req, res, next) => {
    const result = await getAllDrones();
    return res.json(result);
});


router.get('/getPilotBySerialNumber', async (req, res, next) => {
    const {serialNumber} = req.query;
    const result = await getPilotBySerialNumber(serialNumber);
    return res.json(result);
});


module.exports = router;
