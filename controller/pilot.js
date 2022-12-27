const fetch = require("node-fetch-commonjs");
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {GET_PILOTS_API} = require('../config/api');


const getPilotBySerialNumber = async (serialNumber) => {
    const pilotData = await fetch(GET_PILOTS_API + '/' + serialNumber);
    const pilotText = await pilotData.text();
    if(pilotText === ""){
        return {
            "pilotId": "null",
            "firstName": "null",
            "lastName": "null",
            "phoneNumber": "null",
            "createdDt": "null",
            "email": "null"
        };
    }else {
        const pilot = JSON.parse(pilotText);
        return pilot;
    }
}


module.exports = {
    getPilotBySerialNumber
}