const { Command } = require('commander');
const fs = require('fs');
const path = require('path');

const program = new Command();

program
  .requiredOption('-i, --input <path>', 'Path to input JSON file')
  .option('-o, --output <path>', 'Path to output file')
  .option('-d, --display', 'Display result in console');

program.parse(process.argv);

const options = program.opts();

if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

const inputPath = path.resolve(options.input);

if (!fs.existsSync(inputPath)) {
  console.error('Cannot find input file');
  process.exit(1);
}

const jsonData = fs.readFileSync(inputPath, 'utf8');

let parsedData;
try {
  parsedData = JSON.parse(jsonData);
} catch (error) {
  console.error('Invalid JSON file');
  process.exit(1);
}

const resultData = parsedData
  .filter(item => item.ku === "13" && typeof item.value === "number" && item.value > 5)
  .map(item => item.value.toString())
  .join('\n');

if (options.output) {
  fs.writeFileSync(path.resolve(options.output), resultData, 'utf8');
}

if (options.display) {
  console.log(resultData);
}
