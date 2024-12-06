/** @link https://adventofcode.com/2024/day/3 */

/** Part 1 */
const data = await Deno.readTextFile('./src/day_03/input.txt');
let parsedData = data.match(/mul\(\d{1,3},\d{1,3}\)/g);

const sum = parsedData?.reduce((acc, current) => {
    const digits = current.slice(4).slice(0, -1).split(',').map(Number);
    return (digits.reduce((a, b) => a * b)) + acc;
}, 0);

console.log(sum);

/** Part 2 */
parsedData = data.match(/mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g);

if (parsedData) {
    const enabled: string[] = [];
    let shouldCount = true;

    for (let i = 0; i < parsedData?.length; i++) {
        const expression = parsedData[i];

        switch (expression) {
            case "don't()":
                shouldCount = false;
                break;
            case 'do()':
                shouldCount = true;
                /* falls through */
            default:
                if (shouldCount && expression !== 'do()') {
                    enabled.push(expression);
                }
                break;
        }
    }

    const enabledSum = enabled?.reduce((acc, current) => {
        const digits = current.slice(4).slice(0, -1).split(',').map(Number);
        return (digits.reduce((a, b) => a * b)) + acc;
    }, 0);

    console.log(enabledSum);
}
