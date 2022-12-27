const fetch = require("node-fetch-commonjs");
const parseStringPromise = require('xml2js').parseStringPromise;
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {GET_DRONES_API} = require('../config/api');


const getAllDrones = async () => {
    const allDronesData = await fetch(GET_DRONES_API);
    
    // Parse XML into JSON
    const allDronesXML = await allDronesData.text();
    const allDrones = await parseStringPromise(allDronesXML);
    return allDrones;
}


module.exports = {
    getAllDrones
}