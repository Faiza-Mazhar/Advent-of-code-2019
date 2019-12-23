const fs = require('fs');

let orbitInfo = fs.readFileSync('../input/dec6', 'utf8');

const orbitMap = orbitInfo.split('\n').reduce( (mapObject, currentOrbitInfo) => {
  currentOrbitInfo = currentOrbitInfo.split(')');
  mapObject[currentOrbitInfo[1]] = currentOrbitInfo[0];
  return mapObject;
}, {}); 


const countParents = (child) => child in orbitMap ? 1 + countParents(orbitMap[child]) : 0;

const totalNoOfDirectIndirectOrbits = (orbitMap) => {
  return Object.keys(orbitMap).reduce( (cumulativeSum, child) => cumulativeSum + countParents(child), 0)
}

console.log(totalNoOfDirectIndirectOrbits(orbitMap));