const process = require('process');
const readline = require('readline');
const crypto = require('crypto');
const hash = crypto.createHash('md5');


const testInput = 'abc';
const testPassword = '18f47a30';

const realInput = 'ffykfhsq';

function calculateHash(str) {
  return crypto
    .createHash('md5')
    .update(str)
    .digest('hex');
}

function writeSuperCoolDecrypt(password) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

  const passwordWithRandoms = password.map((char) => {
    if (char !== '~') {
      return char;
    }

    return chars[getRandomInt(0, chars.length)];
  });

  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(passwordWithRandoms.join(''));
}

function calculateLetter(doorId, idx, password) {
  let hash = calculateHash(`${doorId}${idx}`);

  while (hash.substr(0,5) !== '00000') {
    idx++;
    hash = calculateHash(`${doorId}${idx}`);

    if (!(idx % 10000)) {
      writeSuperCoolDecrypt(password);
    }
    
  }

  return {
    position: hash.charAt(5), 
    letter: hash.charAt(6), 
    idx
  };
}

function isValidPosition(position, password) {
  const positionIdx = Number(position);
  if (Number.isNaN(positionIdx)) {
    return false;
  }

  if (positionIdx > 7) {
    return false;
  }

  if (password[position] !== '~') {
    return false
  }

  return true;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function calculatePassword(doorId) {
  let password = '~~~~~~~~'.split('');
  let idx = 0;
  let numFoundLetters = 0;

  while (numFoundLetters < 8) {
    const calcResult = calculateLetter(doorId, idx, password);
    idx = ++calcResult.idx;

    if (isValidPosition(calcResult.position, password)) {
      password[Number(calcResult.position)] = calcResult.letter;
      numFoundLetters++;
    }   
  }

  writeSuperCoolDecrypt(password);
  process.stdout.write('\n');
  return password.join('');
}

calculatePassword(realInput);