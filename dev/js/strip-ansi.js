const readline = require('readline');

(async () => {
    const stripAnsi = (await import('strip-ansi')).default;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rl.on('line', (line) => {
        console.log(stripAnsi(line));
    });
})();
