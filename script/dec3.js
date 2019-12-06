const fs = require('fs');


let wires = fs.readFileSync('../input/dec3', 'utf8').split('\n');
// wires[0] = 'R8,U5,L5,D3';
// wires[1] = 'U7,R6,D4,L4';

//   wires[0] = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
//   wires[1] = 'U62,R66,U55,R34,D71,R55,D58,R83';

// wires[0] = 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51';
// wires[1] = 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'

let wirePath1 = wires[0].split(',');
let wirePath2 = wires[1].split(',')

let direction = {
    x: 0,
    y: 0,
    toString() {
        return `${this.x}:${this.y}`;
    }
}

let directionSetWire1 = new Set();
let directionSetWire2 = new Set();

let stepTakenForWire1 = [];
let stepTakenForWire2 =[];

let crossedPosition = [];

const addInformation = function(set, direction, stepsTaken, steps){
    if(!set.has(direction.toString())){
        set.add(direction.toString());
        stepsTaken.push(steps)
    }
}
function mapWires(wire, set, stepTaken){
    let steps = 0;
    wire.map((item ) => {
        let operation = item.substr(0,1);
        let position = parseInt(item.substr(1, item.length))

        switch(operation){
            case 'R':
                while(position > 0){
                    direction.x ++;
                    position --;
                    steps++;
                    addInformation(set, direction, stepTaken, steps)
                }
            break;
            case 'L':
                    while(position > 0){
                        direction.x --;
                        position --;
                        steps++;
                        addInformation(set, direction, stepTaken, steps)
                    }
                
                break;
            case 'U':
                    while(position > 0){
                        direction.y ++;
                        position --;
                        steps++;
                        addInformation(set, direction, stepTaken, steps)
                    }
                break;

            case 'D':
                    while(position > 0){
                        direction.y --;
                        position --;
                        steps++;
                        addInformation(set, direction, stepTaken, steps)
                    }
                break;
        }
    })
}

const resetDirection = function(direction){
    direction.x = 0;
    direction.y = 0;
    steps = 0;
}

const findClosestDistance = function(){
    let distanceArray = [];
    crossedPosition.map((position) => {
        let values = position.split(':');
        let sum = Math.abs(parseInt(values[0])) + Math.abs(parseInt(values[1]));
        distanceArray.push(sum);
    } );

    distanceArray.sort(function(a, b){return a - b});
    return distanceArray[0];
}

const fewStepTakenDistance = function(crossedPosition){
    let index1, index2;
    let currentStep , newStep;
    let wirePathArray1 = [...directionSetWire1]
    let wirePathArray2 = [...directionSetWire2]
    crossedPosition.map((item) => {
        index1 = wirePathArray1.indexOf(item)
        index2 = wirePathArray2.indexOf(item)
        // console.log(item, stepTakenForWire1[index1], stepTakenForWire1[index2])
        newStep = stepTakenForWire1[index1] + stepTakenForWire2[index2]
        // console.log(newStep)
        if(!currentStep)
            currentStep = newStep
        if(newStep < currentStep)
            currentStep = newStep;
    }
    )
    return currentStep;

}

const findIntersectionPoints = function(set1, set2){
    let crossedPosition = []
    for(let item of set2)
        if(set1.has(item))
            crossedPosition.push(item);
    return crossedPosition;
}


const setUpWires = function(){
    resetDirection(direction);
    mapWires(wirePath1, directionSetWire1, stepTakenForWire1);

    resetDirection(direction);
    mapWires(wirePath2, directionSetWire2, stepTakenForWire2);

    crossedPosition = findIntersectionPoints(directionSetWire1, directionSetWire2);
    
}

setUpWires();
console.log('Distance: ' ,   findClosestDistance(crossedPosition))
console.log('Fewer Steps taken for Intersection:' , fewStepTakenDistance(crossedPosition));







