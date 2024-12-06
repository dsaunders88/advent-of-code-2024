/** Generate a directory and files for each day's puzzle */

import { format, join } from '@std/path';
import { parseArgs } from '@std/cli/parse-args';

const args = parseArgs(Deno.args, {
    string: ['path'],
});

if (args.path) {
    const path = join('./', 'src', args.path);
    try {
        await Deno.mkdir(format({ dir: path }));
        console.log(`%cCreated directory for ${args.path}.`, 'color: green');

        const day = args.path.slice(4);

        const indexFile = `/** @link https://adventofcode.com/2024/day/${
            day.startsWith('0') ? day.slice(1) : day
        } */\n\n/** Part 1 */\nconst data = await Deno.readTextFile('./src/${args.path}/input.txt');\n\n/** Part 2 */`;

        await Deno.writeTextFile(
            format({ dir: path, base: 'index.ts' }),
            indexFile,
        );
        await Deno.writeTextFile(format({ dir: path, base: 'input.txt' }), '');
    } catch (error) {
        if (!(error instanceof Deno.errors.NotFound)) {
            console.error(
                `%cDirectory already exists for ${args.path}.`,
                'color: red',
            );
        }
    }
}
