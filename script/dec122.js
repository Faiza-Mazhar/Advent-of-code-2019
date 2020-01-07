const positionInput = [ [0, 4, 0], [-10, -6, -14], [9, -16, -3], [6, -1, 2]]
const velocityInput = [[0, 0, 0], [0, 0, 0],  [0, 0, 0], [0, 0 ,0]]

const applyGravity = function(moons, velocityInfo, axisPosition){
    let velocity = velocityInfo.map( info => info.map(value => value));
    let moonPositions = moons.map( moonPosition => moonPosition.map(value => value))

    moonPositions.forEach( (moonPosition1, index, moonPositions) => {
        let moonVelocity1 = velocity[index];
        for(let nextPairIndex = index+1; nextPairIndex < moonPositions.length; nextPairIndex++ ){
            let moonPosition2 = moonPositions[nextPairIndex];
            let moonVelocity2 = velocity[nextPairIndex];
            
          //  for(let positionIndex = 0; positionIndex < moonPosition1.length; positionIndex ++){
                if(moonPosition1[axisPosition] < moonPosition2[axisPosition]){
                    moonVelocity1[axisPosition]++;
                    moonVelocity2[axisPosition]--;
                }
                else if(moonPosition1[axisPosition] > moonPosition2[axisPosition]){
                    moonVelocity1[axisPosition]--;
                    moonVelocity2[axisPosition]++;
                }
           // }
        }
    });
    return velocity;
}

const applyVelocity = function(moons, velocityInfo, axisPosition){
    let velocity = velocityInfo.map( info => info.map(value => value));
    let positionInput = moons.map( moonPosition => moonPosition.map(value => value))

    positionInput.forEach((position, pIndex) => {
        position[axisPosition] = position[axisPosition] + velocity[pIndex][axisPosition];
    })
    return positionInput;
}

const reducer = (accumulator, currentValue) => accumulator + Math.abs(currentValue);

const SIMULATION = 2772;

const findFinalEnergy = function(moons, velocityInfo, axisIndex){
    let velocity = velocityInfo.map( info => info.map(value => value));
    let position = moons.map( moonPosition => moonPosition.map(value => value))
    let startingState = false
    let step = 0;
    while(!startingState){
        
        let matchedVelocity = true;
        let matchedPosition = true;
        velocity = applyGravity(position, velocity, axisIndex);
        position = applyVelocity(position, velocity, axisIndex);
        step++;

        velocity.map( (currentVelocity, index) => {
            if(currentVelocity[axisIndex] != velocityInput[index][axisIndex]){
                matchedVelocity = false;
            }
        })

        position.map( (currentPosition, index) => {
            if(currentPosition[axisIndex] != positionInput[index][axisIndex]){
                matchedPosition = false;
            }
        })

        startingState = (matchedPosition && matchedVelocity) ? true : false;
        
    }
    console.log(axisIndex, step)
}


findFinalEnergy(positionInput, velocityInput, 0);
findFinalEnergy(positionInput, velocityInput, 1);
findFinalEnergy(positionInput, velocityInput, 2);