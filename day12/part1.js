'use strict';

const assembunny = [
    'cpy 1 a',
    'cpy 1 b',
    'cpy 26 d',
    'jnz c 2',
    'jnz 1 5',
    'cpy 7 c',
    'inc d',
    'dec c',
    'jnz c -2',
    'cpy a c',
    'inc a',
    'dec b',
    'jnz b -2',
    'cpy c b',
    'dec d',
    'jnz d -6',
    'cpy 14 c',
    'cpy 14 d',
    'inc a',
    'dec d',
    'jnz d -2',
    'dec c',
    'jnz c -5'
];


let registers = {
    a: 0,
    b: 0,
    c: 0, // <- change this for part2
    d: 0
};

let instructionPointer = 0;

// value is either a register or a numeric value
function cpy(value, destination) {
    let val;

    if (Number.isNaN(Number(value))) {
        val = registers[value];
    } else {
        val = Number(value);
    }

    registers[destination] = val;
    instructionPointer++;
}

function inc(register) {
    registers[register]++;
    instructionPointer++;
}

function dec(register) {
    registers[register]--;
    instructionPointer++;
}

function jnz(register, offset) {
    offset = Number(offset);
    if (registers[register] !== 0) {
        instructionPointer += offset;
    } else {
        instructionPointer++;
    }
}

const instructions = {
    cpy, inc, dec, jnz
};


while (instructionPointer < assembunny.length) {
    const instruction = assembunny[instructionPointer];
    const tokens = instruction.split(' ');

    instructions[tokens[0]](tokens[1], tokens[2]);
}

console.log(registers);
