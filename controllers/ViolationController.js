const express = require('express');
const router = express.Router();
const DroneModel = require('../models/DroneModel');
const PilotModel = require('../models/PilotModel');
const ViolationModel = require('../models/ViolationModel');
const ViolationJob = require('../job/ViolationJob');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const getViolationInfos = async (req, res, next) => {
    const violationRes = await ViolationModel.getViolationInfos();
    return res.json(violationRes);
}


const updateViolationInfos = async (req, res, next) => {
    const updateRes = await ViolationJob.updateViolationInfos();
    return res.json(updateRes);
}


const getAllDrones = async (req, res, next) => {
    const result = await DroneModel.getAllDrones();
    return res.json(result);
}


const getPilotBySerialNumber = async (req, res, next) => {
    const {serialNumber} = req.query;
    const result = await PilotModel.getPilotBySerialNumber(serialNumber);
    return res.json(result);
}



module.exports = {
    getViolationInfos,
    updateViolationInfos,
    getAllDrones,
    getPilotBySerialNumber
};
