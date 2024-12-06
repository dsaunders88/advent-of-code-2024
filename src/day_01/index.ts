/** @link https://adventofcode.com/2024/day/1 */

/** Part 1 */
const data = await Deno.readTextFile('./src/day_01/input.txt');
const parsedData = data.split(/\s\s\s|\n/gm);

const listA: number[] = [];
const listB: number[] = [];

for (let i = 0; i < parsedData.length; i++) {
    if (i % 2 === 0) {
        listA.push(parseInt(parsedData[i]));
    } else {
        listB.push(parseInt(parsedData[i]));
    }
}

listA.sort((a, b) => a - b);
listB.sort((a, b) => a - b);

const differences: number[] = [];

for (let i = 0; i < listA.length; i++) {
    differences.push(Math.abs(listA[i] - listB[i]));
}

const totalDistance = differences.reduce((acc, current) => acc + current);
console.log(totalDistance);

/** Part 2 */
const similarities: number[] = [];

for (let i = 0; i < listA.length; i++) {
    const currentA = listA[i];
    const similarB = listB.filter((value) => value === currentA);
    similarities.push(currentA * similarB.length);
}

const similarityScore = similarities.reduce((acc, current) => acc + current);
console.log(similarityScore);
