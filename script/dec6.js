const fs = require('fs');
let orbitInfo = fs.readFileSync('../input/dec6', 'utf8').split('\n').map(value => value.split(')'));
//   let orbitInfo = "COM)B B)C C)D D)E E)F B)G G)H D)I E)J J)K K)L 9)3".split(' ').map(value => value.split(')'));
//  console.log(orbitInfo)

const createOrbitStructure = () => {
    let orbitInfoPerMoon = [ [orbitInfo[0][0]] ];
    orbitInfo.forEach(orbit => {
        let orbitHandled = false;
        orbitInfoPerMoon.forEach( currentMoonInfo => {
            if(currentMoonInfo.includes(orbit[0]) && currentMoonInfo.indexOf(orbit[0]) == currentMoonInfo.length-1){
                    currentMoonInfo.push(orbit[1]);
                    orbitHandled = true;
                } 
        });

        if(!orbitHandled){
            orbitInfoPerMoon.push(orbit);
        }
});
    return orbitInfoPerMoon;
}

    const calculateOrbits = (orbitInfoPerMoons) =>{
        let moonOrbitCount = {}

        orbitInfoPerMoons.map( orbitInfoMoon => {
            let orbitCount;
            let parentMoonOrbitInfo = 0;
            orbitInfoMoon.map( (moon , index)  => {
                orbitCount = index  + parentMoonOrbitInfo;
                if(!moonOrbitCount.hasOwnProperty(moon)){
                    moonOrbitCount[moon] = orbitCount;
                } else{
                    parentMoonOrbitInfo = moonOrbitCount[moon];
                }
            })
        })

        return moonOrbitCount;
    }

    const calculateTotalOrbits = (moonOrbitCount) => {
        let totalNoOfOrbits = 0;
        for( moon in moonOrbitCount){
            totalNoOfOrbits += moonOrbitCount[moon];
        }
        return totalNoOfOrbits;
    }



  console.log(calculateTotalOrbits ( calculateOrbits( createOrbitStructure() ) ) )