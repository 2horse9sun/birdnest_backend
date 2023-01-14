const express = require('express');
const router = express.Router();
const PilotModel = require('../models/PilotModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const getPilotBySerialNumber = async (req, res, next) => {
    const {serialNumber} = req.query;
    const result = await PilotModel.getPilotBySerialNumber(serialNumber);
    return res.json(result);
}


module.exports = {
    getPilotBySerialNumber
};
