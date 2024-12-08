/** @link https://adventofcode.com/2024/day/5 */

/** Part 1 */
const data = await Deno.readTextFile('./src/day_05/input.txt');
const [a, b] = data.split('\n\n');
const rules = a.split('\n').map((rule) => rule.split('|'));
const updates = b.split('\n').map((update) => update.split(','));

const correctlyOrdered: string[][] = [];
const incorrectlyOrdered: string[][] = [];

for (let i = 0; i < updates.length; i++) {
	const update = updates[i];
	const checks: number[] = [];

	for (let j = 0; j < update.length; j++) {
		const current = update[j];
		const rulesToCheck = rules.filter((rule) => rule[0] === current);

		for (let k = 0; k < rulesToCheck.length; k++) {
			const rule = rulesToCheck[k];
			if (update.includes(rule[1])) {
				if (update.indexOf(rule[1]) > j) {
					checks.push(1);
				} else {
					checks.push(0);
					break;
				}
			}
		}
	}

	if (!checks.includes(0)) {
		correctlyOrdered.push(update);
	} else {
		incorrectlyOrdered.push(update);
	}
}

let sum = 0;
for (let i = 0; i < correctlyOrdered.length; i++) {
	const update = correctlyOrdered[i];
	sum += parseInt(update[(update.length - 1) / 2]);
}

console.log(sum);

/** Part 2 */
sum = 0;

for (let i = 0; i < incorrectlyOrdered.length; i++) {
	const update = incorrectlyOrdered[i];

	for (let j = 0; j < update.length; j++) {
		const current = update[j];
		const rulesToCheck = rules.filter((rule) => rule[0] === current);

		for (let k = 0; k < rulesToCheck.length; k++) {
			const rule = rulesToCheck[k];

			if (update.includes(rule[1])) {
				if (update.indexOf(rule[1]) < update.indexOf(rule[0])) {
					const fromIndex = update.indexOf(rule[0]);
					const toIndex = update.indexOf(rule[1]);

					if (toIndex >= update.length) {
						let l = toIndex - update.length + 1;
						while (l--) {
							update.push('');
						}
					}

					update.splice(toIndex, 0, update.splice(fromIndex, 1)[0]);
				}
			}
		}
	}

	const middle = parseInt(update[(update.length - 1) / 2]);
	sum += middle;
}

console.log(sum);
