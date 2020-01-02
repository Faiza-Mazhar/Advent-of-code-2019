const fs = require('fs');
input = fs.readFileSync('../input/dec9', 'utf8');

let intCodeInput = input.split(',').map(Number);
let MODE = {
    POSITION: 0,
    IMMEDIATE : 1,
    RELATIVE : 2
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
    RELATIVE_BASE : '09',
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

const runTest = (myIntCode, inputValue) => {

    let intCode = myIntCode.slice()
    let input = inputValue;
    let output = [];
    let instructionPointer = 0
    let relativeBaseOffset = 0;
    let HALT_OPCODE = false;

    while(instructionPointer <= intCode.length && !HALT_OPCODE){
        let opcodes = manageOpcode(intCode[instructionPointer]);
        let value1 = findValueBasedOnParameterMode(intCode, opcodes[1], instructionPointer+1, relativeBaseOffset)
        let value2 = findValueBasedOnParameterMode(intCode, opcodes[2], instructionPointer+2, relativeBaseOffset)
        let positionAddress = getPositionAddressBasedOnParameterMode(intCode, opcodes[3], instructionPointer + 3, relativeBaseOffset)
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
                positionAddress = getPositionAddressBasedOnParameterMode(intCode, opcodes[1], instructionPointer + 1, relativeBaseOffset);
                intCode[positionAddress] = input; 
                instructionPointer += 2;
                break;

            case OPCODE.output: //4
                positionAddress = getPositionAddressBasedOnParameterMode(intCode, opcodes[1], instructionPointer + 1, relativeBaseOffset);
                let outputValue = intCode[positionAddress] ? intCode[positionAddress] : 0;
                output.push(outputValue)
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

            case OPCODE.RELATIVE_BASE: //9
                relativeBaseOffset += value1;
                instructionPointer += 2;
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


const getPositionAddressBasedOnParameterMode = (intCode, parameterMode, valueIndex, relativeBase)=> {

    let value;
    switch(Number(parameterMode)){
        case MODE.POSITION: //0
        value = intCode[valueIndex] ? intCode[valueIndex] : 0 ;
        break;
        case MODE.IMMEDIATE: //1
            value = valueIndex ? valueIndex : 0 ;
        break;
        case MODE.RELATIVE: //2
            value = intCode[valueIndex] + relativeBase ? intCode[valueIndex] + relativeBase : 0 ;
        break;
    }
    return value = (value < 0) ? 0 : value;
}
const findValueBasedOnParameterMode = function(intCode, parameterMode, valueIndex, relativeBase){
    let value;
    switch (Number(parameterMode)) {
        case MODE.POSITION: //0
            value = intCode[intCode[valueIndex]]? intCode[intCode[valueIndex]] : 0 ;
        break;
        case MODE.IMMEDIATE: //1
            value = intCode[valueIndex] ? intCode[valueIndex] : 0;
        break;
        case MODE.RELATIVE: //2
            value = intCode[ intCode[valueIndex ] + relativeBase]  ? intCode[ intCode[valueIndex] + relativeBase] : 0;
        break;
    }
    return value;
}

console.log('Part 1',runTest(intCodeInput, 1))
console.log('Part 2',runTest(intCodeInput, 2))