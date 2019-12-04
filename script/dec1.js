const fs = require('fs');
let massInfo = fs.readFileSync('../input/dec1', 'utf8').split('\n');

const findMassFuel = function(mass){
    return (Math.floor(mass/3) - 2);
}

findTotalMassFuel = function(mass){
    let massFuel;
    let totalMassFuel = 0;
    do{
        massFuel = findMassFuel(mass);
        totalMassFuel += massFuel;
        console.log('Total mass fuel now for mass ' + mass + ' is ' + totalMassFuel);
        mass = massFuel;
    }while(massFuel > 5)
    return totalMassFuel;
}


const findTotalRequiredFuel = function(masses,  findFuel){
    let reqFuel = masses.reduce(
        (accumulator, mass) => accumulator + findFuel(mass)
    , 0)
    return reqFuel;
}

console.log('Total fuel for problem 1 : ' + findTotalRequiredFuel(massInfo, findMassFuel))
console.log('Total fuel for problem 2 : ' + findTotalRequiredFuel(massInfo, findTotalMassFuel))

