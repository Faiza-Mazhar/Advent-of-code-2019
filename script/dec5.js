const fs = require('fs');
let intCode = fs.readFileSync('../input/dec5', 'utf8').split(',').map((item) => parseInt(item));


let MODE = {
    POSITION: 0,
    IMMEDIATE : 1
}

let OPCODE = {
    ADDITION : '01',
    MULTIPLY: '02',
    INPUT: '03',
    OUTPUT: '04',
    JUMP_IF_TRUE: '05',
    JUMP_IF_FALSE: '06',
    LESS_THAN: '07',
    EQUALS: '08',
    HALT_OPCODE: '99'
}



const manageOpcode = function(opcode){
    opcode = opcode.toString();
    while(opcode.length != 5){
        opcode =  '0' + opcode
    }
    opcode = opcode.split('').reverse();
    opcode[0] = opcode[1] + '' + opcode[0];
    opcode.splice(1,1)
   
    return opcode
}

const runTest = function(intCode, inputValue){

    let input = inputValue;
    let output = [];
    let instructionPointer = 0
    let HALT_OPCODE = false;
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
                intCode[positionAddress] = input; 
                instructionPointer += 2;
                break;

            case OPCODE.OUTPUT: //4

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
    return output;
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

// console.log("part 1",runTest(intCode, 1));
console.log("part 2", runTest(intCode, 5));
