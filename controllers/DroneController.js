const express = require('express');
const router = express.Router();
const DroneModel = require('../models/DroneModel');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');


const getAllDrones = async (req, res, next) => {
    const result = await DroneModel.getAllDrones();
    return res.json(result);
}


module.exports = {
    getAllDrones
};
