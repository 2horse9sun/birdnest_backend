const fetch = require("node-fetch-commonjs");
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {GET_PILOTS_API} = require('../config/api');


const getPilotBySerialNumber = async (serialNumber) => {
    try {
        const pilotData = await fetch(GET_PILOTS_API + '/' + serialNumber);
        const pilotText = await pilotData.text();
        const pilot = JSON.parse(pilotText);
        return pilot;
    } catch (error) {
        console.log(error);
        return {
            "pilotId": "null",
            "firstName": "null",
            "lastName": "null",
            "phoneNumber": "null",
            "createdDt": "null",
            "email": "null"
        };
    }

}


module.exports = {
    getPilotBySerialNumber
}