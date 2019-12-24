const fs = require('fs');
// const intCodeInput = fs.readFileSync('../input/dec7', 'utf8').split(',').map(Number);

const intCodeInput = [3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
    27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5];


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

function runTest (myIntCode){

    let intCode = myIntCode.map(code => code)
    
    return function* () {

        let output;
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
                    instructionPointer += 2;
                    intCode[positionAddress] = yield {type:  'INPUT'}
                    break;
    
                case OPCODE.output: //4
    
                    positionAddress = intCode[instructionPointer+1];
                    output = intCode[positionAddress]
                    instructionPointer += 2;
                    yield { type: 'OUTPUT', value: output };
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
                    return output;
                default:
                    console.log('error')
                    HALT_OPCODE = true;
               
                    break
            } 
        }
        return output;
    }
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
    
    const possiblePermutationPart2 = createPermutations([5,6,7,8,9])
    
    const amplifierPart1 = (intCodeInput, sequence) => {
        let output = 0;
        sequence.forEach(currentAmplifier => {
            output = runTest(intCodeInput, output, parseInt(currentAmplifier));
        })
        return output;
    }
    
    const amplifierPart2 = (intCodeInput, sequence) => {
        
        const amplifiers = sequence.map( (value, index) => {
            const amplifier = runTest(intCodeInput)()
            amplifier.next();
            const output = amplifier.next(value);
            const name = String.fromCharCode(index + 65)
            return { amplifier, output, name}
        })  
        

        let power = 0;

        while (amplifiers[amplifiers.length - 1].output.done === false) {
            for (const currentAmplifier of amplifiers) {
              const { amplifier } = currentAmplifier
              const tempOutput = amplifier.next(power)
              // continue to next input
              currentAmplifier.output = amplifier.next()
              power = tempOutput.done ? tempOutput.value : tempOutput.value.value
            }
          }
        return power;
    }

  

const runAmplifier = (amplifier, sequence) => {
    const possiblePermutation = createPermutations(sequence)
    let maxThrusterValue = -1;
    
    possiblePermutation.forEach( permutation => {
        let power = amplifier(intCodeInput, permutation)
        if(power > maxThrusterValue)
            maxThrusterValue = power;
    })
    return maxThrusterValue;
}

// console.log(runAmplifier(amplifierPart1, [0,1,2,3,4]));
console.log(runAmplifier(amplifierPart2, [5,6,7,8,9]));

// console.log(part2(intCodeInput))

