/** @link https://adventofcode.com/2024/day/6 */

/** Part 1 */
const data = await Deno.readTextFile('./src/day_06/input.txt');
const rows = data.split('\n');

enum Direction {
	North,
	East,
	South,
	West,
}
const MAP_HEIGHT = rows.length;
const MAP_WIDTH = rows[0].length;
const BARRIER_COORDINATES: number[][] = [];

const startingLocation: number[] = [];
const startingDirection = Direction.North;

const visited: number[][] = [];

for (let i = 0; i < rows.length; i++) {
	const row = rows[i];

	for (let j = 0; j < row.length; j++) {
		if (row[j] === '#') {
			BARRIER_COORDINATES.push([i, j]);
		}
		if (row[j] === '^') {
			startingLocation.push(i, j);
			visited.push([i, j, Direction.North]);
		}
	}
}

function getNextCoordinates(direction: Direction, location: number[]) {
	let nextRow: number;
	let nextCol: number;
	let nextDirection: Direction;

	switch (direction) {
		case Direction.North:
			nextRow = location[0] - 1;
			nextCol = location[1];
			nextDirection = Direction.East;
			break;
		case Direction.East:
			nextRow = location[0];
			nextCol = location[1] + 1;
			nextDirection = Direction.South;
			break;
		case Direction.South:
			nextRow = location[0] + 1;
			nextCol = location[1];
			nextDirection = Direction.West;
			break;
		case Direction.West:
			nextRow = location[0];
			nextCol = location[1] - 1;
			nextDirection = Direction.North;
			break;
	}

	return {
		coordinates: [nextRow, nextCol],
		direction: nextDirection,
	};
}

function checkLocation(direction: Direction, location: number[]): void {
	const next = getNextCoordinates(direction, location);

	const barrier = BARRIER_COORDINATES.find((set) =>
		set[0] === next.coordinates[0] && set[1] === next.coordinates[1]
	);

	const newLocation: number[] = [];

	if (barrier) {
		const changeDir = getNextCoordinates(next.direction, location);
		direction = next.direction;
		newLocation[0] = changeDir.coordinates[0];
		newLocation[1] = changeDir.coordinates[1];
	} else {
		newLocation[0] = next.coordinates[0];
		newLocation[1] = next.coordinates[1];
	}

	newLocation[2] = direction;

	const hasVisited = visited.find((coordinates) =>
		coordinates[0] === newLocation[0] && coordinates[1] === newLocation[1]
	);

	if (!hasVisited) {
		visited.push(newLocation);
	}

	if (barrier) {
		const lastLocation = visited[visited.length - 2];
		lastLocation[2] = direction;
	}

	if (
		newLocation[0] === 0 || newLocation[0] === MAP_HEIGHT - 1 ||
		newLocation[1] === 0 || newLocation[1] === MAP_WIDTH - 1
	) {
		return;
	} else {
		checkLocation(direction, newLocation);
	}
}

checkLocation(startingDirection, startingLocation);

console.log(visited.length);
