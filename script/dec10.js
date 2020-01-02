const fs = require('fs');
let input = '.#..# ..... ##### ....# ...##';
// input = '109,19,204,-34,99'
// input = fs.readFileSync('../input/dec9', 'utf8');
let astroidMap = input.split(' ').map( row => row.split(''));
console.log(astroidMap)