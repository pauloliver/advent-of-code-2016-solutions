const crypto = require('crypto');
const salt = 'jlmsuwbz';

let idx = 0;
let numPadKeys = 0;
let repeatedChar = '';

const calculatedHashes = [];

const threeRepeats = /([A-Z]|[0-9])\1\1/i;
function getFiveRepeats(char) {
    return new RegExp(`(${char})\\1\\1\\1\\1`, 'i');
}

function nextNHasRepeats(n, char, startingIdx) {
    const regex = getFiveRepeats(char);
    for (let i = startingIdx; i < startingIdx + n; i++) {
        const hash = calculateHash(salt, i);
        if (regex.exec(hash)) {
            return true;
        }
    }

    return false;
}

function calculateHash(salt, idx) {
    const str = `${salt}${idx}`;
    let hash;
    if (calculatedHashes[idx]) {
        hash = calculatedHashes[idx];
    }
    else  {
        hash = crypto
            .createHash('md5')
            .update(str)
            .digest('hex');

        calculatedHashes[idx] = hash;
    }

    return hash;
}


while (numPadKeys < 64) {
    const hash = calculateHash(salt, idx);
    const matches = threeRepeats.exec(hash);

    if (matches) {
        repeatedChar = matches[1];

        if (nextNHasRepeats(1000, repeatedChar, idx+1)) {
            console.log(`hash at ${idx}`);
            numPadKeys++;
        }
    }

    idx++;
}
console.log('done!');