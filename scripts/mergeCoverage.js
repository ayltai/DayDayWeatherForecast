const { execSync, } = require('child_process');
const fs = require('fs-extra');

const REPORTS_FOLDER   = 'coverage-combined';
const NYC_FOLDER       = '.nyc_output';
const COVERAGE_FOLDER  = 'coverage';
const COVERAGE_FOLDERS = [
    'coverage-app',
    'coverage-e2e',
];

const run = commands => {
    commands.forEach(command => execSync(command, {
        stdio : 'inherit',
    }));
};

fs.emptyDirSync(NYC_FOLDER);
fs.emptyDirSync(COVERAGE_FOLDER);
fs.emptyDirSync(REPORTS_FOLDER);
COVERAGE_FOLDERS.forEach(folder => {
    fs.copyFileSync(`${folder}/coverage-final.json`, `${REPORTS_FOLDER}/${folder}.json`);
    fs.removeSync(folder);
});

if (process.platform === 'win32') {
    run([
        `node_modules\\.bin\\nyc merge ${REPORTS_FOLDER} && copy coverage.json ${NYC_FOLDER}\\coverage.json`,
        `rmdir /S /Q ${REPORTS_FOLDER}`,
        `node_modules\\.bin\\nyc report --reporter lcov --report-dir ${COVERAGE_FOLDER}`,
        `node_modules\\.bin\\nyc report --reporter html --report-dir ${COVERAGE_FOLDER}`,
        `rmdir /S /Q ${NYC_FOLDER}`,
    ]);
} else {
    run([
        `./node_modules/.bin/nyc merge ${REPORTS_FOLDER} && cp coverage.json ${NYC_FOLDER}/coverage.json`,
        `rm -rf ${REPORTS_FOLDER}`,
        `./node_modules/.bin/nyc report --reporter lcov --report-dir ${COVERAGE_FOLDER}`,
        `./node_modules/.bin/nyc report --reporter html --report-dir ${COVERAGE_FOLDER}`,
        `rm -rf ${NYC_FOLDER}`,
    ]);
}
