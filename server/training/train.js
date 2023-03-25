const fs = require('fs');
const path = require('path');
const config = require('../model/config');
const model = require('../model/letters');

function train() {
    console.log('Wczytuję');
    let dataArray = [];
    let fileName = undefined;
    let fileData = undefined;
    let fileArray = undefined;
    for (let i = 0; i < config.letters.length; i++) {
        fileArray = [];
        fileName = "data-" + config.letters[i] + ".json";
        try {
            fileData = fs.readFileSync(path.join(__dirname, "data", fileName));
            fileArray = JSON.parse(fileData.toString());
        } catch (err) {
            console.log('file', fileName, 'not fourd');
        };
        dataArray = dataArray.concat(fileArray);
    };
    let trainCycle = 0;
    let correctionCount = 0;
    let elementCorrectionCount = 0;
    do {
        trainCycle++;
        correctionCount = 0;
        for (let i = 0; i < dataArray.length; i++) {
            const element = dataArray[i];
            elementCorrectionCount = model.learn(element.board, element.letter);
            correctionCount += elementCorrectionCount;
        };
        console.log('Trening', trainCycle, ',liczba zmian ', correctionCount);
    } while (correctionCount > 0);
    console.log('Koniec treningu!');
}

train();