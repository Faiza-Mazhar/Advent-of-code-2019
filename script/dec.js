const fs = require('fs');
const _ = require('lodash')

let raw = fs.readFileSync('../input/dec3', 'utf8');

const [line1, line2] = raw.split('\n');
 
function setupSet(inputLine, outCoords, distances){
    let x=0;
    let y=0;
    let distance = 1;  
    for(inst of inputLine.split(',')){
        const dir = inst.charAt(0);
        const len = inst.substr(1)
        if(dir=='R'){
            for(let i=0; i<len; i++){
                x++;
                outCoords.push(`${x}_${y}`)
                distances[`${x}_${y}`] = distance;
                distance++;
            }
        }
        if(dir=='L'){
            for(let i=0; i<len; i++){
                x--;
                outCoords.push(`${x}_${y}`)
                distances[`${x}_${y}`] = distance;
                distance++;
            }
        }
        if(dir=='U'){
            for(let i=0; i<len; i++){
                y++;
                outCoords.push(`${x}_${y}`)
                distances[`${x}_${y}`] = distance;
                distance++;
            }
        }
        if(dir=='D'){
            for(let i=0; i<len; i++){
                y--;
                outCoords.push(`${x}_${y}`);
                distances[`${x}_${y}`] = distance;
                distance++;
            }
        }
    }
}
const line1Coords = [];
const line2Coords = [];
const distances1 = {}
const distances2 = {}
setupSet(line1, line1Coords, distances1);
setupSet(line2, line2Coords, distances2)
 
 
const dists = []
intersections = _.intersection(line1Coords, line2Coords);
 
for(point of intersections){
    dists.push(_.sum(point.split('_').map(Number)))
}
console.log("Part 1:")
console.log(_.min(dists))
 
let longest = 999999;
for(elem of intersections){
    let dist1 = distances1[elem];
    let dist2 = distances2[elem];
    if((dist1 + dist2) < longest)
        longest = dist1 + dist2
}
console.log("Part 2:")
console.log(longest)

