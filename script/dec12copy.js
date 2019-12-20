
// let positionS  = [
//     [0, 4, 0], [-10, -6, -14], [9, -16, -3], [6, -1, 2]
// ]

let positionS = [ [-1, 0, 2], [2, -10, -7], [4, -8, 8], [3, 5, -1]]
// let positionS = [ [-8, -10, 0], [5, 5, 10], [2, -7, 3], [9, -8, -3]]
let velocityS = [
    [0, 0, 0], [0, 0, 0],  [0, 0, 0], [0, 0 ,0]
]
const applyGravity = function(moons, velocityInfo){

    let velocity = velocityInfo.map( info => info.map(value => value));
    let moonPositions = moons.map( moonPosition => moonPosition.map(value => value))
    
    moonPositions.forEach( (moonPosition1, index, moonPositions) => {
        let moonVelocity1 = velocity[index];
        for(let nextPairIndex = index+1; nextPairIndex < moonPositions.length; nextPairIndex++ ){
            let moonPosition2 = moonPositions[nextPairIndex];
            let moonVelocity2 = velocity[nextPairIndex];
            
            for(let positionIndex = 0; positionIndex < moonPosition1.length; positionIndex ++){

                if(moonPosition1[positionIndex] < moonPosition2[positionIndex]){
                    moonVelocity1[positionIndex]++;
                    moonVelocity2[positionIndex]--;
                }
                else if(moonPosition1[positionIndex] > moonPosition2[positionIndex]){
                    moonVelocity1[positionIndex]--;
                    moonVelocity2[positionIndex]++;
                }
            }
        }
    });
    return velocity;
}

const applyVelocity = function(moons, velocityInfo){
    let velocity = velocityInfo.map( info => info.map(value => value));
    let positions = moons.map( moonPosition => moonPosition.map(value => value))

    positions.forEach((position, pIndex) => {
        position.forEach((axis, aIndex ) => {
            position[aIndex] = axis + velocity[pIndex][aIndex];
        })
    })
    return positions;
}

const reducer = (accumulator, currentValue) => accumulator + Math.abs(currentValue);

const findEnergy = function (moonInfos){
    return moonInfos.map( moonInfo => moonInfo.reduce(reducer, 0))
}

const findTotalEnergy = function(potentialEnergy, kineticEnergy){
    let energy = potentialEnergy.map((item, index) => item * kineticEnergy[index])
    return energy.reduce(reducer, 0)
}

const SIMULATION = 2772;

const findFinalEnergy = function(moons, velocityInfo){
    let velocity = velocityInfo.map( info => info.map(value => value));
    let position = moons.map( moonPosition => moonPosition.map(value => value))
    let startingState = false
    let step = 0;
    while(!startingState){
        velocity = applyGravity(position, velocity);
        position = applyVelocity(position, velocity);
        step++;
        if(velocity.toString() == velocityInfo.toString() && position.toString() == moons.toString()){
            startingState = true;
        }
    }
    console.log(step)
}


console.log(findFinalEnergy(positionS, velocityS));