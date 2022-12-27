const {getAllDrones} = require('../controller/drone');
const {getPilotBySerialNumber} = require('../controller/pilot');
const {saveViolationInfos} = require('../controller/violation');
const {SuccessResponse, ErrorResponse} = require('../utils/ResponseModel');

// Item in DynamoDB will expire 10min after when the snapshot was taken
const EXPIRATION_TIME = 10 * 60;

// NDZ metrics
const ORIGIN_POSITIONX = 250000;
const ORIGIN_POSITIONY = 250000;
const RADIUS = 100000;


const dist2 = (p1x, p1y, p2x, p2y) => {
    return (p1x-p2x)**2 + (p1y-p2y)**2;
}


const getDronesInTheCircle = (allDrones) => {
    let dronesInTheCircle = [];
    for(const drone of allDrones){
        const positionX = drone.positionX[0];
        const positionY = drone.positionY[0];
        const dist2FromNest = dist2(positionX, positionY, ORIGIN_POSITIONX, ORIGIN_POSITIONY);
        if(dist2FromNest < RADIUS**2){
            drone.dist = Math.sqrt(dist2FromNest) / 1000;
            dronesInTheCircle.push(drone);
        }
    }
    return dronesInTheCircle;
}


// Combine all necessary data (drone, pilot, time) into an item
const buildViolationInfos = (dronesInTheCircle, snapshotTimestamp) => {
    let promises = [];
    for(const drone of dronesInTheCircle){
        const promise = new Promise(async (resolve, reject) => {
            const pilot = await getPilotBySerialNumber(drone.serialNumber[0]);
            resolve({
                ...drone, 
                ...pilot, 
                snapshotTimestamp,
                expirationTime: snapshotTimestamp + EXPIRATION_TIME})
        });
        promises.push(promise);
    }
    return Promise.all(promises);
}


// Detect drones in NDZ, query those drones' pilots' info and save them into DB
// The task can also be separated from the node server and run as a service
const updateViolationInfos = async () => {
    try {
        const allDronesData = await getAllDrones();
        const allDrones = allDronesData.report.capture[0].drone;
        const snapshotTimestamp = Math.floor(new Date(allDronesData.report.capture[0]['$'].snapshotTimestamp).getTime() / 1000);
        const dronesInTheCircle = getDronesInTheCircle(allDrones);
        const violationInfos = await buildViolationInfos(dronesInTheCircle, snapshotTimestamp);
        if(violationInfos.length > 0){
            await saveViolationInfos(violationInfos);
        }else{
            console.log("no violation detected");
        }
        return new SuccessResponse(violationInfos);
    } catch (error) {
        console.log(error);
        return new ErrorResponse(error);
    }
}


module.exports = {
    updateViolationInfos
}