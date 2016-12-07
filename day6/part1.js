const input = require('./input');

const testInput = [
    'eedadn',
    'drvtee',
    'eandsr',
    'raavrd',
    'atevrs',
    'tsrnev',
    'sdttsa',
    'rasrtv',
    'nssdts',
    'ntnada',
    'svetve',
    'tesnvt',
    'vntsnd',
    'vrdear',
    'dvrsen',
    'enarar'
]

function dejamMessage(jammedMessages) {
    const letterCounts = [];
    const messageLength = jammedMessages[0].length;

    for (let i = 0; i < messageLength; i++) {
        letterCounts.push(new Map());
    }

    jammedMessages.forEach((message) => {
        message.split('').forEach((char, idx) => {
            let letterCount = letterCounts[idx];
            if (!letterCount.get(char)) {
                letterCount.set(char, 1);
            } else {
                let count = letterCount.get(char);
                count++;
                letterCount.set(char, count);
            }
        })
    });

    const message = letterCounts.map((countMap) => {
        return [...countMap].sort((a,b) => {
            return b[1] - a[1];
        })[0][0]
    });

    console.log(message.join(''));
}

dejamMessage(input);
