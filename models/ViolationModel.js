const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');
const {unmarshell, query, putItem, batchWriteItem, scan} = require('../db/ddbClient');


// Put required info into DB
const saveViolationInfos = async (violationInfos) => {
    for(const violationInfo of violationInfos){

        // Check if current info item already existed
        const queryParams = {
            ExpressionAttributeValues: {
              ':p': {S: violationInfo.pilotId}
             },
           KeyConditionExpression: 'pilotId = :p',
           ProjectionExpression: "pilotId, firstName, lastName, phoneNumber, email, closestDist",
           TableName: 'birdnest_violation_info'
        };
        let existingViolationInfo = await query(queryParams);
        let closestDist = violationInfo.dist;

        // If current info item already existed, update the closest comfirmed distance
        if(existingViolationInfo.length > 0){
            existingViolationInfo = unmarshell(existingViolationInfo[0]);
            closestDist = Math.min(closestDist, existingViolationInfo.closestDist);
        }

        // Put(Replace) current info into DB
        var putParams = {
            TableName: 'birdnest_violation_info',
            Item: {
                "pilotId": {S: violationInfo.pilotId},
                "firstName": {S: violationInfo.firstName},
                "lastName": {S: violationInfo.lastName},
                "phoneNumber": {S: violationInfo.phoneNumber},
                "email": {S: violationInfo.email},
                "snapshotTimestamp": {N: violationInfo.snapshotTimestamp.toString()},
                "expirationTime": {N: violationInfo.expirationTime.toString()}, // DynamoDB item expiration feature
                "closestDist": {N: closestDist.toString()}
            }
          };
          await putItem(putParams);
    }
}


const getViolationInfos = async () => {
    try {
        const params = {
            ProjectionExpression: "pilotId, firstName, lastName, phoneNumber, email, closestDist, snapshotTimestamp",
            TableName: "birdnest_violation_info",
        };
    
        // Parse DynamoDB item format into JSON format
        let marshelledViolationInfos = await scan(params);
        let violationInfos = [];
        for(let marshelledViolationInfo of marshelledViolationInfos){
            let violationInfo = unmarshell(marshelledViolationInfo);
            violationInfos.push(violationInfo);
        }
        return new SuccessResponse(violationInfos);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
    
}


module.exports = {
    saveViolationInfos,
    getViolationInfos
}