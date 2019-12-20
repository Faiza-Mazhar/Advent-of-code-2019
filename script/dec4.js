const PUZZLE_INPUT = 153517-630395;
let range = {
    start: 153517,
    end: 630395
}


const checkPassword = function(passwordRange){
    let totalPossiblePassword = 0
    for(let currentPassword = passwordRange.start; currentPassword<=passwordRange.end; currentPassword++){
        let password = (currentPassword  + '') .split('');
        let isAdjacentSameNumber = hasAdjacentSameNumbers(password);
        let isIncreasingNumbers = hasIncreasingNumbers(password);
        
        if(isIncreasingNumbers && isAdjacentSameNumber){
            totalPossiblePassword++; 
        }
    }
    return totalPossiblePassword;
}

const hasAdjacentSameNumbers = function (password) {
    let isAdjacentSameNumber = false;
    password.map((digit, index)  => {
        if(password[index] == password[index+1])
            isAdjacentSameNumber = true;
    })
    
    return isAdjacentSameNumber;
}

const hasIncreasingNumbers = function (password){
    let isIncreasingNumbers = true;
    password.map((digit, index) => {
        if(digit > password[index+1] && isIncreasingNumbers)
            isIncreasingNumbers = false
    })

    return isIncreasingNumbers;
}
function hasGroupOfOnlyTwo(pwd) { // For part 2
    return (pwd.match(/(\d)\1+/g) || []).map(sequence => sequence.length).includes(2);
  }

console.log(checkPassword(range))