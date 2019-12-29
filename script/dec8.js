const fs = require('fs');
let imageInfo = fs.readFileSync('../input/dec8', 'utf8').split('').map(Number);
// let imageInfo = '0222112222120000'.split('').map(Number);
const WIDTH = 25;
const LENGTH = 6;

const createImage = (imageInfo) => {
    let imageArrays = [];
    let numImages = (imageInfo.length ) / (WIDTH * LENGTH)
    let currentPixelIndex = 0;

    for(let currentImage = 0; currentImage < numImages ; currentImage++){
        let imageArray = [];
        for(let currentRow = 0; currentRow < LENGTH; currentRow++){
            let row = imageInfo.slice(currentPixelIndex, currentPixelIndex + WIDTH)
            imageArray.push(row);
            currentPixelIndex += WIDTH;
        }
        imageArrays.push(imageArray)
    }
    return imageArrays;
}

const countNumbers = (image) => {
    let numberInfo = {
        ZEROS : 0,
        ONES : 0,
        TWOS: 0
    }
    
    const foundDigitCount = (image, digit) =>{
        return image
        .map( rows => rows.filter(pixel => pixel == digit ).length)
        .reduce( (accumulator, value) => accumulator + value, 0);
    }
    numberInfo.ZEROS = foundDigitCount(image, 0);
    numberInfo.ONES = foundDigitCount(image, 1);
    numberInfo.TWOS = foundDigitCount(image, 2);
    return numberInfo

}


const findLayerWithLeastZeros = (images) =>{
    let finalInfo = {
        ZEROS : 10000,
        ONES : 0,
        TWOS: 0
    }
    images.forEach( image => {
        let currentImageInfo = countNumbers(image)
        finalInfo = (currentImageInfo.ZEROS < finalInfo.ZEROS)? currentImageInfo : finalInfo;
    })
    console.log(finalInfo)
}

let imageArrays = createImage(imageInfo);
// findLayerWithLeastZeros(imageArrays)


const mergeLayers = (imageArrays) => {

    const COLOUR = {
        BLACK : 0, 
        WHITE : 1,
        TRANSPARENT : 2
    }

    const getMessageCharacter = (value) => {
        let char;
        switch (value){
            case COLOUR.BLACK:
                char = '░'
            break;
            case COLOUR.WHITE:
                char = '█'
            break;
            default:
                char = '-'
            break;
        }
        return char;
    }

    let finalImage = imageArrays[0];

    for(let rowIndex = 0; rowIndex < finalImage.length; rowIndex++){
        for(let colIndex = 0; colIndex < finalImage[rowIndex].length; colIndex++){
        
            if(finalImage[rowIndex][colIndex] != COLOUR.TRANSPARENT){
                finalImage[rowIndex][colIndex] = getMessageCharacter(finalImage[rowIndex][colIndex])
            } else {
                let imageIndex = 1;
                while(imageArrays[imageIndex][rowIndex][colIndex] == COLOUR.TRANSPARENT 
                    && imageIndex < imageArrays.length){
                        imageIndex++;
                }
                finalImage[rowIndex][colIndex] = getMessageCharacter(imageArrays[imageIndex][rowIndex][colIndex]);
            }
        }
        console.log(finalImage[rowIndex].join(""))
    }
}





mergeLayers(imageArrays)
// console.log(imageArrays.length)


