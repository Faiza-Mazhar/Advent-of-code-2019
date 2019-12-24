const fs = require('fs');
let intCodeInput = fs.readFileSync('../input/dec7', 'utf8').split(',').map((item) => parseInt(item));


let MODE = {
    POSITION: 0,
    IMMEDIATE : 1
}

let OPCODE = {
    ADDITION : '01',
    MULTIPLY: '02',
    INPUT: '03',
    output: '04',
    JUMP_IF_TRUE: '05',
    JUMP_IF_FALSE: '06',
    LESS_THAN: '07',
    EQUALS: '08',
    HALT_OPCODE: '99'
}

const manageOpcode = (opcode) => {
    opcode = opcode.toString();
    while(opcode.length != 5){
        opcode =  '0' + opcode
    }
    opcode = opcode.split('').reverse();
    opcode[0] = opcode[1] + '' + opcode[0];
    opcode.splice(1,1)
   
    return opcode
}

const runTest = (myIntCode, inputValue, phaseInput) => {

    let intCode = myIntCode.map(code => code)
    let input = inputValue;
    let output = [];
    let instructionPointer = 0
    let HALT_OPCODE = false;
    let phaseInputUsed = false;
    while(instructionPointer <= intCode.length && !HALT_OPCODE){
        let opcodes = manageOpcode(intCode[instructionPointer]);
        let value1, value2;
        let positionAddress;

        value1 = findValueBasedOnParameterMode(intCode, opcodes[1], instructionPointer+1)
        value2 = findValueBasedOnParameterMode(intCode, opcodes[2], instructionPointer+2)
        positionAddress = intCode[instructionPointer+3]

        switch (opcodes[0]){
            case OPCODE.ADDITION: //1
                intCode[positionAddress] = value1 + value2;
                instructionPointer += 4;
                break;

            case OPCODE.MULTIPLY: //2
                intCode[positionAddress] = value1 * value2;
                instructionPointer += 4;
                break;

            case OPCODE.INPUT: //3
                
                positionAddress = intCode[instructionPointer+1];

                if(!phaseInputUsed){
                    intCode[positionAddress] = phaseInput; 
                    phaseInputUsed = true;
                } else {
                    intCode[positionAddress] = input; 
                }
                instructionPointer += 2;
                break;

            case OPCODE.output: //4

                positionAddress = intCode[instructionPointer+1];
                output.push(intCode[positionAddress])
                instructionPointer += 2;
                break;
            
            case OPCODE.JUMP_IF_TRUE: //5
                instructionPointer =  value1 != 0 ? value2 : instructionPointer + 3;
                break;
            
            case OPCODE.JUMP_IF_FALSE: //6
                instructionPointer =  value1 == 0 ? value2 : instructionPointer + 3;
                break;
            
            case OPCODE.LESS_THAN: //7
                intCode[positionAddress] = (value1 < value2) ? 1 : 0;
                instructionPointer += 4;
                break;

            case OPCODE.EQUALS: //8
                intCode[positionAddress] = (value1 == value2) ? 1 : 0;
                instructionPointer += 4;
                break;

            case OPCODE.HALT_OPCODE: //99
                HALT_OPCODE = true;
                break;
            default:
                console.log('error')
                HALT_OPCODE = true;
                break
        } 
    }
    return output[0];
}

const findValueBasedOnParameterMode = function(intCode, parameterMode, valueIndex){
    let value;
    if(parameterMode == MODE.POSITION){
        value = intCode[intCode[valueIndex]];
    }
    if(parameterMode == MODE.IMMEDIATE){
        value = intCode[valueIndex];
    }
    return value;
}

const createPermutations = (inputArr) => {
    let result = [];
    const permute = (arr, m = []) => {
    if (arr.length === 0){
        result.push(m)
        } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
   permute(inputArr)
   return result;
  }
const possiblePermutation = createPermutations([0,1,2,3,4])

const makeAmplifier = (intCodeInput, sequence) => {
    let output = 0;
    sequence.forEach(currentAmplifier => {
        output = runTest(intCodeInput, output, parseInt(currentAmplifier));
    })
    return output;
}

const amplifierPart2 = (intCodeInput, sequence) => {
    let output = 0;

    
}

const runAmplifier = (possiblePermutation) => {
    let maxThrusterValue = -1;
    
    possiblePermutation.forEach( permutation => {
        let power = makeAmplifier(intCodeInput, permutation)
        if(power > maxThrusterValue)
            maxThrusterValue = power;
    })

    return maxThrusterValue;
}

console.log(runAmplifier(possiblePermutation));

