/** @link https://adventofcode.com/2024/day/4 */

/** Part 1 */
const data = await Deno.readTextFile('./src/day_04/input.txt');
const rows = data.split('\n').map((chars) => chars.split(''));

const find = ['X', 'M', 'A', 'S'];
const findReverse = find.toReversed();
let found = 0;

function checkSlice(char: string, slice: string[]): void {
	if (char === find[0]) {
		if (slice.every((value, index) => value === find[index])) {
			found++;
		}
	}

	if (char === findReverse[0]) {
		if (
			slice.every((value, index) => value === findReverse[index])
		) {
			found++;
		}
	}
}

for (let i = 0; i < rows.length; i++) {
	const row = rows[i];

	for (let j = 0; j < row.length; j++) {
		const char = row[j];
		const n = i - 3;
		const e = j + 3;
		const s = i + 3;

		if (e < row.length) {
			const slice = row.slice(j, j + 4);
			checkSlice(char, slice);
		}

		if (e < row.length && n >= 0) {
			const slice = [
				char,
				rows[i - 1][j + 1],
				rows[i - 2][j + 2],
				rows[i - 3][j + 3],
			];
			checkSlice(char, slice);
		}

		if (e < row.length && s < rows.length) {
			const slice = [
				char,
				rows[i + 1][j + 1],
				rows[i + 2][j + 2],
				rows[i + 3][j + 3],
			];
			checkSlice(char, slice);
		}

		if (s < rows.length) {
			const slice = [
				char,
				rows[i + 1][j],
				rows[i + 2][j],
				rows[i + 3][j],
			];
			checkSlice(char, slice);
		}
	}
}

console.log(found);

/** Part 2 */
const cross = ['M', 'A', 'S'];
found = 0;

for (let i = 0; i < rows.length; i++) {
	const row = rows[i];

	for (let j = 0; j < row.length; j++) {
		const char = row[j];
		const n = i - 1;
		const e = j + 1;
		const s = i + 1;
		const w = j - 1;

		if (n >= 0 && e < row.length && s < rows.length && w >= 0) {
			if (char === cross[1]) {
				let nwse = false;
				let nesw = false;

				if (rows[n][w] === cross[0] && rows[s][e] === cross[2]) {
					nwse = true;
				} else if (rows[n][w] === cross[2] && rows[s][e] === cross[0]) {
					nwse = true;
				}

				if (rows[n][e] === cross[0] && rows[s][w] === cross[2]) {
					nesw = true;
				} else if (rows[n][e] === cross[2] && rows[s][w] === cross[0]) {
					nesw = true;
				}

				if (nwse && nesw) {
					found++;
				}
			}
		}
	}
}

console.log(found);
