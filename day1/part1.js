let input = 'R4, R1, L2, R1, L1, L1, R1, L5, R1, R5, L2, R3, L3, L4, R4, R4, R3, L5, L1, R5, R3, L4, R1, R5, L1, R3, L2, R3, R1, L4, L1, R1, L1, L5, R1, L2, R2, L3, L5, R1, R5, L1, R188, L3, R2, R52, R5, L3, R79, L1, R5, R186, R2, R1, L3, L5, L2, R2, R4, R5, R5, L5, L4, R5, R3, L4, R4, L4, L4, R5, L4, L3, L1, L4, R1, R2, L5, R3, L4, R3, L3, L5, R1, R1, L3, R2, R1, R2, R2, L4, R5, R1, R3, R2, L2, L2, L1, R2, L1, L3, R5, R1, R4, R5, R2, R2, R4, R4, R1, L3, R4, L2, R2, R1, R3, L5, R5, R2, R5, L1, R2, R4, L1, R5, L3, L3, R1, L4, R2, L2, R1, L1, R4, R3, L2, L3, R3, L2, R1, L4, R5, L1, R5, L2, L1, L5, L2, L5, L2, L4, L2, R3'
    .split(',')
    .map(s => s.replace(' ', ''));

let upDown = 0;
let leftRight = 0;

function goUp(num) {
    upDown += num;
}

function goDown(num) {
    upDown -= num;
}

function goLeft(num) {
    leftRight -= num;
}

function goRight(num) {
    leftRight += num;
}

const directions = ['UP', 'RIGHT', 'DOWN', 'LEFT'];

let currentDirection = 'UP';

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

function move(num) {
    switch(currentDirection) {
        case 'UP':
            return goUp(num);
        case 'DOWN':
            return goDown(num);
        case 'LEFT':
            return goLeft(num);
        case 'RIGHT':
            return goRight(num);
    }
}

input.forEach((d) => {
    const dir = d.charAt(0);
    const len = Number.parseInt(d.slice(1), 10);

    updateDirection(dir);
    move(len);
});

console.log('\n\nupDown', upDown);
console.log('leftRight', leftRight);
console.log(`total: ${Math.abs(upDown) + Math.abs(leftRight)}`)