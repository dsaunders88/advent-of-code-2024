/** Wrapper to dynamically run a day's code from cli input */

import { parseArgs } from '@std/cli/parse-args';

const args = parseArgs(Deno.args, {
    string: ['day'],
});

await import(`../src/day_${args.day}/index.ts`);
