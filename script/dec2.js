const fs = require('fs');
let intCode = fs.readFileSync('../input/dec2', 'utf8').split(',').map((item) => parseInt(item));

const findFinalPosition = function(intCode, noun, verb){
    intCode[1] = noun;
    intCode[2] = verb;

    for(let index = 0; index < intCode.length && intCode[index]!= 99; index += 4 ){
        if(intCode[index] === 1){

            intCode[intCode[index + 3]] = intCode[intCode[index+1]] + intCode[intCode[index+2]]

        } else if(intCode[index] === 2){

            intCode[intCode[index + 3]] = intCode[intCode[index+1]] * intCode[intCode[index+2]]

        } else if(intCode[index] === 99) 
        
            return;
    }
    return intCode[0]
}


const findNounVerbPair = function(intCode){
    let DESIRED_OUTPUT = 19690720;
    for(let noun = 0; noun < 100 ; noun++){
        for(let verb = 0; verb < 100; verb++){
            let input = [...intCode];
            let output = findFinalPosition(input, noun, verb);
            if(output === DESIRED_OUTPUT){
                console.log(`noun: ${noun}, verb: ${verb}`)
                return 100 * noun + verb;
            }
        }
    }

}


console.log('Part 1', findFinalPosition([...intCode], 12, 2));
console.log('Part 2', findNounVerbPair(intCode));


