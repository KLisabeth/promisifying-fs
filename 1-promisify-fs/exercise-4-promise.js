// require dependencies
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const util = require('util')

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

const fileName1 = process.argv[2];
const filePath1 = path.join(__dirname + fileName1);
log(1, filePath1);

const fileName2 = process.argv[3];
const filePath2 = path.join(__dirname + fileName2);
log(2, filePath2);

log(3, `reading ${fileName1} ...`);
readFilePromise(filePath1, 'utf-8')
.then((oldFile1)=>{
  log(4, `reading ${fileName2} ...`)
   readFilePromise(filePath2, 'utf-8')
  .then((oldFile2)=>{
    log(5, `writing ${fileName1} ...`);
    writeFilePromise(filePath1, oldFile2)
    .then(()=>{
      log(6, `writing ${fileName2} ...`);
       writeFilePromise(filePath2, oldFile1)
      .then(() => {
         log(7, `reading ${fileName1} ...`);
          readFilePromise(filePath1, 'utf-8')
        .then((newFile1) => {
          log(8, `asserting new ${fileName1} contents ...`);
           assert.strictEqual(newFile1, oldFile2);

            log(9, `reading ${fileName2} ...`);
            readFilePromise(filePath2, 'utf8')
            .then((newFile2) => {

               log(10, `asserting new ${fileName2} contents ...`);
               assert.strictEqual(newFile2, oldFile1);

               log(11, '\033[32mpass!\x1b[0m');
               fs.appendFileSync(__filename, `\n// pass: ${(new Date()).toLocaleString()}`);

            }).catch(err => console.error(err));

        }).catch(err => console.error(err));

      }).catch(err => console.error(err))

    }).catch(err => console.error(err));

  }).catch(err => console.error(err));
      
}).catch(err => console.error(err))
  

// pass: 5/14/2020, 9:54:20 PM
// pass: 5/14/2020, 9:54:30 PM