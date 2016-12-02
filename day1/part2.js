let input = 'R4, R1, L2, R1, L1, L1, R1, L5, R1, R5, L2, R3, L3, L4, R4, R4, R3, L5, L1, R5, R3, L4, R1, R5, L1, R3, L2, R3, R1, L4, L1, R1, L1, L5, R1, L2, R2, L3, L5, R1, R5, L1, R188, L3, R2, R52, R5, L3, R79, L1, R5, R186, R2, R1, L3, L5, L2, R2, R4, R5, R5, L5, L4, R5, R3, L4, R4, L4, L4, R5, L4, L3, L1, L4, R1, R2, L5, R3, L4, R3, L3, L5, R1, R1, L3, R2, R1, R2, R2, L4, R5, R1, R3, R2, L2, L2, L1, R2, L1, L3, R5, R1, R4, R5, R2, R2, R4, R4, R1, L3, R4, L2, R2, R1, R3, L5, R5, R2, R5, L1, R2, R4, L1, R5, L3, L3, R1, L4, R2, L2, R1, L1, R4, R3, L2, L3, R3, L2, R1, L4, R5, L1, R5, L2, L1, L5, L2, L5, L2, L4, L2, R3'
    .split(',')
    .map(s => s.replace(' ', ''));



let upDown = 0;
let leftRight = 0;

const directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];
let currentDirection = 'UP';

let visitedLocations = new Set();
let baseLocation;

function stepUp(num) {
    upDown++;
}

function stepDown(num) {
    upDown--;
}

function stepLeft(num) {
    leftRight--;
}

function stepRight(num) {
    leftRight++;
}

function getLocation() {
    return `${upDown},${leftRight}`;
}


// returns true when base is found,
// or false if the walk is completed without finding the base
function walk(num) {
    let takeStep;

    switch (currentDirection) {
        case 'UP' :
            takeStep = stepUp;
            break;
        case 'DOWN' :
            takeStep = stepDown;
            break;
        case 'LEFT' :
            takeStep = stepLeft;
            break;
        case 'RIGHT' :
            takeStep = stepRight;
            break;
    }

    for (let i=0; i < num; i++) {
        takeStep();
        let currentLocation = getLocation();
        if (visitedLocations.has(currentLocation)) {
            baseLocation = currentLocation;
            return true;
        }
        visitedLocations.add(currentLocation);
    }

    return false;
}



function updateDirection(instruction) {
    let directionIndex = directions.indexOf(currentDirection);

    switch(instruction) {
        case 'R':
            directionIndex++;
            break;
        case 'L':
            directionIndex--;
            break;
    }

    directionIndex = (directionIndex + 4) % 4;
    currentDirection = directions[directionIndex];
}

for (instruction of input) {
    console.log(instruction);
    const dir = instruction.charAt(0);
    const len = Number.parseInt(instruction.slice(1), 10);

    updateDirection(dir);
    let baseFound = walk(len);
    if (baseFound) {
        console.log(`The base is at ${baseLocation}`);
        break;
    }
}
