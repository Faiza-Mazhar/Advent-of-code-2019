const fs = require('fs');
// let orbitInfo = fs.readFileSync('../input/dec6', 'utf8').split('\n').map(value => value.split(')'));
 let orbitInfo = "COM)B B)C C)D D)E E)F B)G G)H D)I E)J J)K K)L".split(' ').map(value => value.split(')'));
 console.log(orbitInfo)

const createOrbitStructure = () => {
    let orbitInfoPerMoon = [ [orbitInfo[0][0]] ];
    orbitInfo.forEach(orbit => {
        orbitInfoPerMoon.forEach( currentMoonInfo => {
            if(currentMoonInfo.includes(orbit[0])){
                if(currentMoonInfo.indexOf(orbit[0]) == currentMoonInfo.length-1){
                    currentMoonInfo.push(orbit[1]);
                } else {
                orbitInfoPerMoon.push(orbit);
            }
        }
    });
});
    console.log(orbitInfoPerMoon)
}


// orbitInfo.forEach(function each(item) {
//     if (Array.isArray(item))
//       item.forEach(each);
//     else
//       console.log(item)
//   });

  createOrbitStructure()