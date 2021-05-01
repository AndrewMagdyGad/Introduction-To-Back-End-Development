let sum = 0;
const args = process.argv;

for (let i = 2; i < args.length; i++) {
    sum += Number(args[i]);
}

console.log(sum);
