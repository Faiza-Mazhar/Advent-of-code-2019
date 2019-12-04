const fs = require('fs');


let wires = fs.readFileSync('../input/dec3', 'utf8').split('\n');
wires[0] = 'R8,U5,L5,D3';
wires[1] = 'U7,R6,D4,L4';

  wires[0] = 'R75,D30,R83,U83,L12,D49,R71,U7,L72';
  wires[1] = 'U62,R66,U55,R34,D71,R55,D58,R83';

let wirePath1 = wires[0].split(',');
let wirePath2 = wires[1].split(',')

let direction = {
    x: 0,
    y: 0,
    step: 0,
    toString() {
        return `${this.x}:${this.y}:${this.step}`;
    }
}

let directionSetWire1 = new Set();
let directionSetWire2 = new Set();
let crossedPosition = [];


function mapWires(wire, set, track){

    wire.map((item ) => {
        let operation = item.substr(0,1);
        let position = parseInt(item.substr(1, item.length))

        switch(operation){
            case 'R':
                while(position > 0){
                    direction.x ++;
                    if(track)
                        direction.step++;
                    position --;
                    set.add(direction.toString());
                }
            break;
            case 'L':
                    while(position > 0){
                        direction.x --;
                        if(track)
                            direction.step++;
                       
                        position --;
                        set.add(direction.toString());
                    }
                
                break;
            case 'U':
                    while(position > 0){
                        direction.y ++;
                        if(track)
                            direction.step++;
                        position --;
                        set.add(direction.toString());
                    }
                break;

            case 'D':
                    while(position > 0){
                        direction.y --;
                        if(track)
                            direction.step++;
                        position --;
                        set.add(direction.toString());
                    }
                break;
        }
    })
}

const resetDirection = function(direction){
    direction.x = 0;
    direction.y = 0;
    direction.step = 0;
}

const findDistance = function(){
    let distanceArray = [];
    crossedPosition.map((position) => {
        let values = position.split(':');
        let sum = Math.abs(parseInt(values[0])) + Math.abs(parseInt(values[1]));
        distanceArray.push(sum);
    } );

    distanceArray.sort(function(a, b){return a - b});

    console.log(crossedPosition)
     return distanceArray[0];
}

const findIntersectionPoints = function(set1, set2){
    for(let item of set2)
        if(set1.has(item))
            crossedPosition.push(item);
}

const findShortestStepIntersectionPoint = function(set1, set2){
    resetDirection(direction);
    mapWires(wirePath1, directionSetWire1, true);

    resetDirection(direction);
    mapWires(wirePath2, directionSetWire2, true);

    

    console.log(directionSetWire1, directionSetWire2)
}

const findDistanceOfClosestIntersectionPoint = function(){
    resetDirection(direction);
    mapWires(wirePath1, directionSetWire1, false);

    resetDirection(direction);
    mapWires(wirePath2, directionSetWire2, false);

    findIntersectionPoints(directionSetWire1, directionSetWire2);
    console.log('Distance: ' ,   findDistance(crossedPosition))
}

// findDistanceOfClosestIntersectionPoint();

findShortestStepIntersectionPoint();





