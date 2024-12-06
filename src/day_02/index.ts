/** @link https://adventofcode.com/2024/day/2 */

/** Part 1 */
const data = await Deno.readTextFile('./src/day_02/input.txt');
const parsedData = data.split(/\n/gm);

type Trend = 'asc' | 'desc';

function testInterval(current: number, test: number): boolean {
    const max = 3;
    if (Math.abs(current - test) > max) {
        return false;
    } else {
        return true;
    }
}

function testTrend(arr: Trend[], index: number): boolean {
    if (arr[index - 2] !== arr[index - 1]) {
        return false;
    } else {
        return true;
    }
}

function assignTrend(current: number, test: number): Trend | false {
    if (current > test) {
        return 'asc';
    } else if (current < test) {
        return 'desc';
    } else {
        return false;
    }
}

function walkLevels(levels: string[]): boolean {
    let isSafe = true;
    const trending: Trend[] = [];
    // skip first level
    for (let i = 1; i < levels.length; i++) {
        const current = parseInt(levels[i]);
        const prev = parseInt(levels[i - 1]);

        const intervalCheck = testInterval(current, prev);
        if (!intervalCheck) {
            isSafe = false;
            break;
        }

        const trend = assignTrend(current, prev);
        if (!trend) {
            isSafe = false;
            break;
        } else {
            trending.push(trend);
        }

        if (i > 1) {
            const trendCheck = testTrend(trending, i);
            if (!trendCheck) {
                isSafe = false;
                break;
            }
        }
    }

    return isSafe;
}

const safeReports: number[] = [];
const unsafeReports: number[] = [];

for (let i = 0; i < parsedData.length; i++) {
    const report = parsedData[i].split(' ');

    const safeCheck = walkLevels(report);

    if (safeCheck) {
        safeReports.push(i);
    } else {
        unsafeReports.push(i);
    }
}

console.log(safeReports.length);

/** Part 2 */
const newSafeReports: number[] = [];

for (let i = 0; i < unsafeReports.length; i++) {
    const report = parsedData[unsafeReports[i]].split(' ');

    for (let j = 0; j < report.length; j++) {
        const newReport = report.slice(0, j).concat(report.slice(j + 1));

        const safeCheck = walkLevels(newReport);

        if (safeCheck) {
            newSafeReports.push(j);
            break;
        }
    }
}

console.log(safeReports.length + newSafeReports.length);
