const { program } = require('commander');
 const fs = require('fs');
 const path = require('path');
 
 program
   .requiredOption('-i, --input <path>', 'Input file path')
   .option('-o, --output <path>', 'Output file path')
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
 
 const rawData = fs.readFileSync(inputPath, 'utf-8');
 let result = '';
 
 
 if (options.output) {
   fs.writeFileSync(path.resolve(options.output), result, 'utf-8');
 }
 
 if (options.display) {
   console.log(result);
 }
