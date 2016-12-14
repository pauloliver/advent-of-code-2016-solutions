
const RESET = '\x1b[0m';
const BG_GREEN = '\x1b[42m';
const FG_CYAN = '\x1b[36m';

const EMPTY = '\u2588'
const WALL = '\u2591';
const VISITED = `${FG_CYAN}${EMPTY}${RESET}`;

const MAP_SIZE = 50;


function isWall(x, y, salt) {
    let num = (x*x) + (3*x) + (2*x*y) + y + (y*y);
    num += salt;

    const binary = Number(num).toString(2);

    const numOneBits = binary.split('').reduce((acc, val) => {
        if (val === '1') {
            acc++;
        }

        return acc;
    }, 0);

    return !!(numOneBits % 2)
}

const goalX = 31;
const goalY = 39;

const salt = 1350;

let map = Array.apply(null, Array(MAP_SIZE)).map(row => Array.apply(null, Array(MAP_SIZE)));

for (let x = 0; x < MAP_SIZE; x++) {
    for(let y = 0; y < MAP_SIZE; y++) {
        map[y][x] = {
            isWall: isWall(x,y,salt),
            visited: false
        };
    }
}

map[goalY][goalX].isGoal = true;
map[1][1].visited = true;

function printMap() {
    for (row of map) {
        let rowString = row.map((tile) => {
            if (tile.isGoal) return `${BG_GREEN}G${RESET}`;
            if (tile.visited) return VISITED;
            if (tile.isWall) return WALL;
            return EMPTY;
        });
        console.log(rowString.join(''));
    };
}


printMap();

console.log(`Wall: ${WALL}`);
console.log(`Empty: ${EMPTY}`);

function findGoal(start, goal) {
    let visitedTiles = [];
    let currentTiles = [];

    let cameFrom = {};

    let pathScore = {};
    let toEndScore = {};

    currentTiles.push(start);
    pathScore[start] = 0;
    toEndScore[start] = heuristicCostEstimate(start, goal);

    while (currentTiles.length) {
        //const currentOpenTiles = currentTiles
    }

    return ':(';
}

function heuristicCostEstimate(start, goal) {
    return Math.abs(start.x - goal.x) + Math.abs(start.y - goal.y);
}