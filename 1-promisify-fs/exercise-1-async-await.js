// require dependencies
const fs = require(`fs`);
const path = require(`path`);
const assert = require(`assert`);
const util = require('util');
// declare constants
const EXERCISE_NAME = path.basename(__filename);
const START = Date.now();

// declare logging function
const log = (logId, value) => console.log(
  `\nlog ${logId} (${Date.now() - START} ms):\n`,
  value,
);


// --- main script ---
console.log(`\n--- ${EXERCISE_NAME} ---`);

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const fileName = process.argv[2];
const filePath = path.join(__dirname + fileName);


const newFileContent = process.argv[3];
log(1, newFileContent);

const writeReadAssert = async (toWrite) => {
  try {
    log(2, 'writing file ...');
    await writeFilePromise(filePath, toWrite);

    log(3, 'reading file ...');
    const fileContent = await readFilePromise(filePath, 'utf-8');

    log(4, 'asserting ...');
    assert.strictEqual(fileName, newFileContent);

    log(5, '\033[32mpass!\x1b[0m');
    // you don't need to refactor this line
    fs.appendFileSync(__filename, `\n// pass: ${(new Date()).toLocaleString()}`);

  } catch (err) {
    console.error(err);
  };
};
writeReadAssert(newFileContent);
// pass: 5/14/2020, 4:38:48 PM
// pass: 5/14/2020, 4:53:10 PM
