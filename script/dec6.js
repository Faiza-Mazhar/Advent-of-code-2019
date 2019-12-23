const fs = require('fs');

let orbitInfo = fs.readFileSync('../input/dec6', 'utf8');

// let orbitInfo = "COM)B B)C C)D D)E E)F B)G G)H D)I E)J J)K K)L K)U I)S";

const orbitMap = orbitInfo.split('\n').reduce( (mapObject, currentOrbitInfo) => {
  currentOrbitInfo = currentOrbitInfo.split(')');
  mapObject[currentOrbitInfo[1]] = currentOrbitInfo[0];
  return mapObject;
}, {}); 

const countParents = (child) => child in orbitMap ? 1 + countParents(orbitMap[child]) : 0;
const totalNoOfDirectIndirectOrbits = (orbitMap) => {
    return Object.keys(orbitMap).reduce( (cumulativeSum, child) => cumulativeSum + countParents(child), 0)
}
console.log('Part 1', totalNoOfDirectIndirectOrbits(orbitMap));
/************************************************************** */


const findParents = (child) => child in orbitMap ? [...findParents(orbitMap[child]), orbitMap[child] ] : [] ;

const findOrbitalSteps = (youParents, sanParents) => {
    let youSteps = youParents.filter( parent => !sanParents.includes(parent));
    let sanSteps = sanParents.filter( parent => !youParents.includes(parent));
    return youSteps.length + sanSteps.length;
}


console.log('Part 2: ',findOrbitalSteps(findParents('YOU'), findParents('SAN')))
  
