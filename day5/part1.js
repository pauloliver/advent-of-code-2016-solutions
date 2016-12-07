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

function calculateLetter(doorId, idx) {
  let hash = calculateHash(`${doorId}${idx}`);

  while (hash.substr(0,5) !== '00000') {
    idx++;
    hash = calculateHash(`${doorId}${idx}`);
  }

  return {letter: hash.charAt(5), idx};
}

function calculatePassword(doorId) {
  let password = [];
  let idx = 0;

  while (password.length < 8) {
    const calcResult = calculateLetter(doorId, idx);
    idx = ++calcResult.idx;
    password.push(calcResult.letter);
  }

  return password.join('');
}

const password = calculatePassword(realInput);

console.log(password);